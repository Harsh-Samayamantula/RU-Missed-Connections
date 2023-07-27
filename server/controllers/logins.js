let databaseController = require('./database');

var logins = {}
var bcrypt = require('bcrypt');

function generateUUID() { // Public Domain/MIT
    var d = new Date().getTime();//Timestamp
    var d2 = ((typeof performance !== 'undefined') && performance.now && (performance.now() * 1000)) || 0;//Time in microseconds since page-load or 0 if unsupported
    return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
        var r = Math.random() * 16;//random number between 0 and 16
        if (d > 0) {//Use timestamp until depleted
            r = (d + r) % 16 | 0;
            d = Math.floor(d / 16);
        } else {//Use microseconds since page-load if supported
            r = (d2 + r) % 16 | 0;
            d2 = Math.floor(d2 / 16);
        }
        return (c === 'x' ? r : (r & 0x3 | 0x8)).toString(16);
    });
}

async function createUsersTable(){
    let connection = await databaseController.getConnection()
    connection.connect()

    try {
        connection.query(`CREATE TABLE main.users (
            uid INT NOT NULL,
            username VARCHAR(32) NOT NULL,
            name VARCHAR(32) NOT NULL,
            gender VARCHAR(16) NOT NULL,
            grad_year INT NOT NULL
        )`)
        connection.commit()
        connection.end()
    } catch(err){
        connection.end()
        throw err;
    }
}

async function createLoginTable() {
    let connection = await databaseController.getConnection();
    connection.connect()
    try {
        connection.query(`CREATE TABLE main.logins(
            uid INT NOT NULL AUTO_INCREMENT,
            username VARCHAR(32) NOT NULL,
            hash VARCHAR(60) NOT NULL,
            salt VARCHAR(29) NOT NULL,
            session CHAR(88) NOT NULL,
            PRIMARY KEY (uid)
        )`)
        connection.commit()
        connection.end()
    } catch (err) {
        connection.end()
        throw (err)
    }
}

async function doesUserExist(username) {
    return new Promise(resolve => {
        let connection = databaseController.getConnection();
        connection.connect()
        try {
            connection.query("SELECT * FROM main.logins WHERE username=? LIMIT 1", [username],
                (err, rows) => {
                    if (err) { throw err };
                    connection.end()
                    resolve(rows.length != 0);
                }
            )
        } catch (err) {
            connection.end()
            throw err;
        }
    })
}

async function registerUser(username, password, name, gender, gradYear) {
    console.log("attempting to create new user "+`${username}:${password}`)
    return new Promise(resolve => {
        doesUserExist(username).then((userExists) => {
            if (!userExists) {
                let connection = databaseController.getConnection();
                connection.connect()

                var salt = bcrypt.genSaltSync(16);
                var hash = bcrypt.hashSync(password, salt);

                try {
                    connection.query("INSERT INTO main.logins(username, hash, salt) VALUES(?, ?, ?)", [username, hash, salt],
                        () => {
                            connection.query("SELECT uid FROM main.logins WHERE username = ?",[username],
                                (err, row)=>{
                                    if (err) throw err;
                                    if (row.length != 1) resolve(400);
                                    var uid = row[0].uid;
                                    connection.query(`
                                        INSERT INTO main.users(uid, name, gender, grad_year)
                                        VALUES(?, ?, ?, ?)`,
                                        [uid, name, gender, gradYear],(err)=>{
                                            if (err) throw err;
                                            connection.commit()
                                            connection.end()
                                            resolve(200);
                                        }
                                    )
                                })
                            })
                } catch (err) {
                    connection.end()
                    resolve(400);
                    throw err;
                }
            } else {
                resolve(409);
            }
        })
    })
}

async function comparePassword(username, password) {
    return new Promise(resolve => {
        let connection = databaseController.getConnection();
        connection.connect()

        try {
            connection.query("SELECT hash, salt FROM main.logins where username=? LIMIT 1", [username],
                (err, row) => {
                    if (err) throw err;
                    if (row.length == 0) return resolve(false);
                    resolve(bcrypt.hashSync(password, row[0].salt) == row[0].hash)
                })
        } catch (err) {
            throw (err);
        } finally {
            connection.end()
        }
    })
}

async function loginWithPassword(username, password) {
    console.log(`logging in with ${username}:${password}`)
    return new Promise(resolve => {
        comparePassword(username, password).then((matches) => {
            let connection = databaseController.getConnection();
            connection.connect()
            var sessionId = generateUUID();

            try {
                connection.query("UPDATE main.logins SET session = ? WHERE username = ?", [sessionId, username])
                connection.commit()
            } catch (err) {
                resolve(500)
                throw err;
            } finally {
                connection.end()
            }

            console.log(matches ? {sessionId:sessionId} : 400)
            resolve(matches ? {sessionId:sessionId} : 400);
        })
    })
}

async function loginWithSessionId(sessionId) {
    return new Promise(resolve => {
        let connection = databaseController.getConnection();
        connection.connect()

        try {
            connection.query("SELECT uid FROM main.logins WHERE session=?", [sessionId],
                (err, row, field) => {
                    resolve(row.length == 1 ? 200 : 400)
                }
            )
        } catch (err) {
            resolve(500)
            throw err;
        } finally {
            connection.end()
        }
    })
}

// (async () => {
//     try {
//         registerUser("JohnDoe", "password").then((succ) => {
//             if (!succ) return;
//             comparePassword("JohnDoe", "password").then((match) => {
//                 // console.log("password "+(match?"matches":"does not match"))
//             })
//         })
//         setTimeout(function () {
//             loginWithPassword("JohnDoe", "password").then((succ) => { console.log("true:" + succ) })
//             loginWithPassword("JohnDoe", "password1").then((succ) => { console.log("false:" + succ) })
//             loginWithSessionId("15036ec0-804d-40a2-bfab-af1b7c4b2444").then((succ) => { console.log("session_id, expected:true, real:" + succ) })
//             loginWithSessionId("15036ec0-804d-40a2-af1b7c4b2444").then((succ) => { console.log("session_id, expected:false, real:" + succ) })
//         }, 5000)
//     } catch (err) {
//         throw err
//     }
// })()

logins.registerUser = registerUser
logins.loginWithPassword = loginWithPassword
logins.loginWithSessionId = loginWithSessionId
module.exports = logins;