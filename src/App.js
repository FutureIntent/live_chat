import React from 'react';
import {
    BrowserRouter,
    Routes,
    Route,
} from "react-router-dom";
import User from './pages/user.js';
import Chat from './pages/chat.js';

function App() {
  return (
      <BrowserRouter>
          <Routes>
              <Route path="/" element={<User />} />
              <Route path="/chat" element={<Chat />} />
          </Routes>
      </BrowserRouter>
  );
}

export default App;
