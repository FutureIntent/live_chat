const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors');
dotenv.config();
const app = express();
const cookieParser = require('cookie-parser');
const session = require('express-session');
const chat = require('./websocket/chat.js');
const http = require('http');
const uuid = require('uuid');
const WebSocket = require('ws');

//server port
const port = process.env.server_port;

//body / cookie parser
app.use(express.json(), cookieParser());

//session parser
const sessionParser = session({
    secret: process.env.session_key,
    saveUninitialized: true,
    cookie: { maxAge: 50 * 60 * 1000 },
    resave: false
});

//start session
app.use(sessionParser);

//CORS
app.use(cors(
    {
        origin: process.env.front_end_URL,
        methods: ['GET', 'POST', 'DELETE', 'UPDATE', 'PUT', 'PATCH'],
        credentials: true
    }
));

//import controllers
const user = require('./controllers/user.js');

//controllers
app.use('/', user);

//websocket server
const server = http.createServer(app);

server.listen(process.env.websocket_port, () => {
console.log('Websocket server started at port: ' + process.env.websocket_port)
})

//websocket server instance
const wss = new WebSocket.Server({ clientTracking: false, noServer: true });
chat(server, wss, sessionParser)


//start express server
app.listen(port, () => {
    console.log(`Server started on port: ${port}`)
});

