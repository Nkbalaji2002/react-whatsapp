import React, { useEffect, useState } from "react";
import { Avatar, IconButton } from "@mui/material";
import {
  AttachFile,
  Search,
  MoreVert,
  Mic,
  InsertEmoticon,
} from "@mui/icons-material";
import "./chat.css";
import { useParams } from "react-router-dom";
import { db } from "./firebase";
import { serverTimestamp } from "firebase/firestore";

function Chat() {
  const [input, setInput] = useState("");
  const [seed, setSeed] = useState("");
  const { roomId } = useParams();

  const [roomData, setRoomData] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    if (roomId) {
      db.collection("rooms")
        .doc(roomId)
        .onSnapshot((snapshot) => setRoomData(snapshot.data()));

      db.collection("rooms")
        .doc(roomId)
        .collection("messages")
        .orderBy("timestamp", "desc")
        .onSnapshot((snapshot) =>
          setMessages(snapshot.docs.map((doc) => doc.data()))
        );
    }
  }, [roomId]);

  useEffect(() => {
    setSeed(Math.floor(Math.random() * 5000));
  }, []);

  const sendMessage = (e) => {
    e.preventDefault();

    // console.log(input);

    db.collection("rooms").doc(roomId).collection("messages").add({
      message: input,
      name: "Nikku",
      timestamp: serverTimestamp(),
    });

    setInput("");
  };

  return (
    <div className="chat">
      <div className="chat-header">
        <Avatar src={`https://avatars.dicebear.com/api/human/${seed}.svg`} />
        <div className="chat-headerinfo">
          <h3>{`${roomData.name}`}</h3>
          <p>
            {" "}
            last seen at{" "}
            {new Date(
              messages[messages.length - 1]?.timestamp?.toDate()
            ).toUTCString()}
          </p>
        </div>
        <div className="chat-headerRight">
          <IconButton>
            <Search />
          </IconButton>
          <IconButton>
            <AttachFile />
          </IconButton>
          <IconButton>
            <MoreVert />
          </IconButton>
        </div>
      </div>

      <div className="chat-body">
        {messages.map((message) => (
          <div
            className={`chat-message ${
              message.name === "Nikku" && `chat-receiver`
            }`}
          >
            <span className="chat-name">{message.name}</span>
            {message.message}
            <span className="chat-timestamp">
              {new Date(
                messages[messages.length - 1]?.timestamp?.toDate()
              ).toUTCString()}
            </span>
          </div>
        ))}
      </div>

      <div className="chat-footer">
        <div className="root">
          <InsertEmoticon />
        </div>
        <form>
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            type="text"
            placeholder={`Type a message`}
          />
          <button onClick={sendMessage}>Send</button>
        </form>
        <div className="root">
          <IconButton>
            <Mic />
          </IconButton>
        </div>
      </div>
    </div>
  );
}

export default Chat;
