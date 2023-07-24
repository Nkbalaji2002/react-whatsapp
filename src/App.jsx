import React, { useState } from "react";
import "./App.css";
import Sidebar from "./Sidebar";
import Chat from "./Chat";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Login";

function App() {
  const [user, setUser] = useState(
    sessionStorage.getItem("user")
      ? JSON.parse(sessionStorage.getItem("user"))
      : ``
  );

  return (
    <>
      <div className="app">
        {!user ? (
          <Login setUser={setUser} />
        ) : (
          <div className="app_body">
            <BrowserRouter>
              <Sidebar setUser={setUser} />
              <Routes>
                <Route path="/rooms/:roomId" element={<Chat />} />
                <Route path="/" element={<Chat />} />
              </Routes>
            </BrowserRouter>
          </div>
        )}
      </div>
    </>
  );
}

export default App;
