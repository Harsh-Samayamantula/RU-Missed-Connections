//Post id, user, text, time, long, lat, location str, comments

let databaseController = require('./database');
const campusGemotry = require('../public/stylesheets/campus_geojson.json')
const GeoJsonGeometriesLookup = require('geojson-geometries-lookup');

var feed = {}

function generateCID(length = 6){
    let charset = "abcdefghijklmnopqrstuvwyxz0123456789"
    let cid = ""
    for (let i = 0; i < length; i++)
        cid += charset.charAt(Math.random()*charset.length);
    
    return cid;
}

async function createFeedTable() {
    let connection = await databaseController.getConnection();
    try {
        res = await connection.query(`CREATE TABLE main.feed (
            pid INT NOT NULL AUTO_INCREMENT,
            uid INT NOT NULL,
            text TEXT NOT NULL,
            posted_at TIMESTAMP NOT NULL,
            location TEXT NOT NULL,
            longitude FLOAT NOT NULL,
            latitude FLOAT NOT NULL,
            campus TINYINT NOT NULL,
            PRIMARY KEY(pid)
        )`)
    } catch (err) {
        throw (err)
    }
}

async function createPost(session_id, content, longitude, latitude, location, campus) {
    // determine campus by longitude and latitude
    /*
    livingston: 0
    busch: 1
    cook_douglass: 2
    college_ave: 3
    */
    const glookup = new GeoJsonGeometriesLookup(campusGemotry);

    const point2 = {type: "Point", coordinates: [longitude, latitude]};
    const matches = glookup.getContainers(point2);

    if(matches.features[0]) campus = matches.features[0].properties.name
    
    let campusCode = -1 
    if (campus == 'livingston') campusCode = 0
    else if (campus == 'busch') campusCode = 1
    else if (campus == 'cookDoug') campusCode = 2
    else if (campus == 'collegeAve') campusCode = 3

    console.log(campusCode)
    // console.log("we have called createPost")
    // console.log("session_id:"+session_id+", content:"+content.substring(0,50))
    return new Promise(resolve => {
        try {
            var connection = databaseController.getConnection()
            connection.connect()
            connection.query("SELECT uid FROM main.logins WHERE session = ?",[session_id],
                (err, row) => {
                    if (err) throw err;
                    if (row.length != 1) resolve(400);
                    var uid = row[0].uid;
                    // console.log("got uid: "+uid)
                    var posted_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    connection.query(`
                    INSERT INTO main.feed(uid, content, posted_at, location, longitude, latitude, campus)
                    VALUES (?, ?, ?, ?, ?, ?, ?)
                    `,      [uid, content, posted_at, location, longitude, latitude, campusCode]
                    , () => { console.log("posted to feed.")} )

                    connection.commit()
                    connection.end()
                    resolve(200);
                }
            )
        } catch (err) {
            connection.end()
            throw(err);
        }
    })
}

async function createComment(session_id, pid, content){
    return new Promise(resolve => {
        try {
            var connection = databaseController.getConnection()
            connection.connect()
            connection.query("SELECT uid FROM main.logins WHERE session = ?",[session_id],
                (err, row, field) => {
                    if (err) throw err;
                    if (row.length != 1) resolve(400);
                    var uid = row[0].uid;
                    var cid = generateCID();
                    var posted_at = new Date().toISOString().slice(0, 19).replace('T', ' ');
                    connection.query(`
                    INSERT INTO main.comments(cid, pid, uid, content, posted_at)
                    VALUES (?, ?, ?, ?, ?)
                    `,      [cid, pid, uid, content, posted_at]
                    )

                    connection.commit()
                    connection.end()
                    resolve(200)
                }
            )
        } catch (err) {
            connection.end()
            throw(err);
        }
    })
}

async function getPosts(campus, limit = 25){
    campus = campus || -1
    return new Promise(resolve => {
        try {
            var connection = databaseController.getConnection()
            let whereCampus = (campus==-1)?'':'WHERE campus='+campus

            connection.connect()
            connection.query(`
                SELECT pid, uid, content, posted_at, location, longitude, latitude, campus
                FROM main.feed\n`+whereCampus+`
                ORDER BY posted_at ASC
                LIMIT ?`
                //()
                [limit],
                (err, row) => {
                    if (err) throw err;
                    var data = {}
                    for (let i = 0; i < row.length; i++)
                        data[i] = {
                            pid: row[i].pid,
                            uid: row[i].uid,
                            content: row[i].content,
                            posted_at: row[i].posted_at,
                            location: row[i].location,
                            longitude: row[i].longitude,
                            latitude: row[i].latitude,
                            campus: row[i].campus
                        }

                    connection.end()
                    resolve(data);
                }
            )
        } catch(err){
            connection.end()
            throw err
        }
    })
}

async function getComments(pid, limit = 25){
    return new Promise(resolve => {
        try {
            var connection = databaseController.getConnection()
            connection.connect()
            connection.query(`
                SELECT content, uid, posted_at
                FROM main.comments
                WHERE pid = ?
                ORDER BY posted_at ASC
                LIMIT ?
                `,
                [pid, limit],
                (err, row) => {
                    if (err) throw err;
                    var data = {}
                    for (let i = 0; i < row.length; i++)
                        data[i] = {
                            uid: row[i].uid,
                            content: row[i].content,
                            posted_at: row[i].posted_at,
                        }
                    connection.end()
                    resolve(data);
                }
            )
        } catch(err){
            connection.end()
            resolve(500);
            throw err
        }
    })
}

feed.createPost = createPost
feed.createComment = createComment
feed.getPosts = getPosts
feed.getComments = getComments

module.exports = feed