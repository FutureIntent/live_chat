//cookie parser to get session id
function cookieParser(req) {

    var cookies = {};
    //Not working any more
    //if(client.upgradeReq.headers.cookie) request.headers.cookie.split(';')...
    //This works
    if (req.headers.cookie) req.headers.cookie.split(';').forEach(function (cookie) {
        var parts = cookie.match(/(.*?)=(.*)$/);
        var name = parts[1].trim();
        var value = (parts[2] || '').trim();
        cookies[name] = value;
    });

    return cookies
}

//websocket connection handler
function chat(server, wss, sessionParser) {

    /*
        //get session's sid from session cookie to get session data from DB
        const cookies = cookieParser(req);
        const session_id = cookies['connect.sid']
        console.log("Sessions's sid: " + session_id); 
    */

    let clients = [];

    server.on('upgrade', function (request, socket, head) {

        sessionParser(request, {}, () => {
            if (!request.session.userId || !request.session.auth || !request.session.username) {
                socket.write('HTTP/1.1 401 Unauthorized\r\n\r\n');
                socket.destroy();
                return;
            }

            wss.handleUpgrade(request, socket, head, function (ws) {
                wss.emit('connection', ws, request);
            });
        });
    });

    wss.on('connection', function (ws, request) {

        const userId = request.session.userId;
        const username = request.session.username;

        clients.push(ws);

        ws.on('message', function (message) {
            //
            // Here we can now use session parameters.
            //
            console.log(`Received message ${message} from user ${username}`);

            clients.forEach(function each(client) {        
                    client.send(`${username}: ${message}`);          
            })

        });

        ws.on('close', function () {
            clients = clients.filter((client) => {
                return client!=ws
            })
        });
    });

}

module.exports = chat;