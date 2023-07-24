import React, { useEffect, useState } from "react";
import "./sidebar.css";
import { Avatar, IconButton } from "@mui/material";
import { Chat, DonutLarge, MoreVert, Search } from "@mui/icons-material";
import SidebarChat from "./SidebarChat";
import { db } from "./firebase";

function Sidebar({ setUser }) {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("rooms").onSnapshot((snapshot) =>
      setRooms(
        snapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }))
      )
    );

    return () => {
      unsubscribe();
    };
  }, []);

  console.log(rooms);

  return (
    <div className="sidebar">
      <button
        onClick={() => {
          sessionStorage.setItem("user", "");
          setUser("");
        }}
      >
        Logout
      </button>
      <div className="sidebar-header">
        <Avatar />
        <div className="sidebar-headerRight">
          <div className="root">
            <IconButton>
              <DonutLarge />
            </IconButton>
            <IconButton>
              <Chat />
            </IconButton>
            <IconButton>
              <MoreVert />
            </IconButton>
          </div>
        </div>
      </div>

      <div className="sidebar-search">
        <div className="root">
          <Search />
        </div>
        <div className="sidebar-searchContainer">
          <input type="text" placeholder="search the chat" />
        </div>
      </div>

      <div className="sidebar-chats">
        <SidebarChat addNewChat />
        {rooms.map((room) => (
          <SidebarChat key={room.id} id={room.id} name={room.data.name} />
        ))}
      </div>
    </div>
  );
}

export default Sidebar;
