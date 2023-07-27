const socketio = require('socket.io')
const http = require('http')

var chat = {}
var databaseController = require("./database")

function createChatTable(){
    let connection = databaseController.getConnection();
    connection.connect()

    connection.query(`
    CREATE TABLE main.chat (
        sender INT NOT NULL,
        recipient INT NOT NULL,
        content VARCHAR(250) NOT NULL,
        sent_at TIMESTAMP NOT NULL
    )`)
    connection.commit()
    connection.end()
}

async function uploadChatMessage(session_id, to, content, timestamp){
    return new Promise(resolve => {
        let connection = databaseController.getConnection();
        connection.connect()
        try {
            connection.query("SELECT uid FROM main.logins WHERE session = ?",[session_id],
                (err, row) => {
                    if (err) throw err;
                    if (row.length != 1) resolve(400);
                    var uid = row[0].uid;
                    connection.query(`
                        INSERT INTO main.chat(sender, recipient, content, sent_at)
                        VALUES(?, ?, ?, ?)`,
                        [uid, to, content, timestamp]
                    )
                    connection.commit();
                    connection.end();
                    resolve(200);
                }
            )
        } catch(err) {
            connection.end()
            resolve(400);
            throw err;
        }
    })
}

// message: {to, content, timestamp}
async function bulkUploadChatMessages(session_id, messages){

}

async function downloadChatMessages(session_id, recipient, limit=25){
    // console.log("downloading chat messages", session_id, recipient)
    return new Promise(resolve => {
        let connection = databaseController.getConnection();
        connection.connect()
        try {
            connection.query("SELECT uid FROM main.logins WHERE session = ?",[session_id],
                (err, row) => {
                    if (err) throw err;
                    if (row.length != 1) resolve(400);
                    var uid = row[0].uid;
                    connection.query(`
                        SELECT sender, recipient, content, sent_at
                        FROM main.chat
                        WHERE (sender = ? AND recipient = ?) OR (recipient = ? AND sender = ?)
                        ORDER BY sent_at ASC
                        LIMIT ?`
                    , [uid, eval(recipient), uid, eval(recipient),limit],
                        (err, row) => {
                            if (err) throw err;
                            var data = {};
                            for (let i = 0; i < row.length; i++){
                                data[i] = {}
                                data[i].sender = row[i].sender
                                data[i].recipient = row[i].recipient
                                data[i].content = row[i].content
                                data[i].sent_at = row[i].sent_at
                            }
                            console.log(data)
                            resolve(data)
                        }
                    )
                }
            )
            
        } catch(err) {
            connection.end()
            resolve(500);
            throw err;
        }
    })
}

function setup(expressServer){
    const server = http.createServer(express);
    const io = socketio(server);

    io.on('connection', client => {
        
        client.on('event', data => {
            
        })

        client.on('disconnect', data => {

        })
    })
}


chat.uploadChatMessage = uploadChatMessage
chat.bulkUploadChatMessages = bulkUploadChatMessages
chat.downloadChatMessages = downloadChatMessages
chat.setup = setup
module.exports = chat