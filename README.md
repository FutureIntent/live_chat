# About

Live chat application's prototype made with the use of Node.js, React.js, Express.js, Session-Cookie, Web Socket('ws') for demonstration purpose.

'http://localhost:3000/' - authorisation page;\
'http://localhost:3000/chat' - message page;

The idea is to send real time messages on the web socket server and broadcast these messages among all web socket clients, showing their nicknames and messages in the browser's console. 

## Front-end

Locate root directory in terminal, e.g. `cd live_chat` then use following commands:

### `npm install`
### `npm start`

Open [http://localhost:3000](http://localhost:3000) to view it in your browser. (change !! fetching !! URLs in './live_chat/src/pages' if needed)

## Back-end

Locate './live_chat/back_end' directory through terminal. If needed, customise '.env' file in the same directory and use following commands:

### `npm install`
### `npm install nodemon`
### `npm start`

Default back-end's URL should be [http://localhost:3001](http://localhost:3001) \
Web Socket's default URL should be [wss://localhost:3003](wss://localhost:3003)
