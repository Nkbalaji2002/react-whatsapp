import React, { useState } from "react";
import { auth, provider } from "./firebase";
import "./login.css";
import { Button } from "@mui/material";

function Login({ setUser }) {
  const signIn = () => {
    auth
      .signInWithPopup(provider)
      .then((result) => {
        sessionStorage.setItem("user", JSON.stringify(result.user));
        setUser(result.user);
      })
      .catch((error) => alert(error.message));
  };

  return (
    <div className="Login">
      <div className="login-container">
        <img
          src="https://upload.wikimedia.org/wikipedia/commons/thumb/6/6b/WhatsApp.svg/120px-WhatsApp.svg.png"
          alt="whatsapp-logo"
        />
        <div className="login-text">
          <h1>Sign in to Whatsapp</h1>
        </div>
        <Button type="submit" onClick={signIn}>
          <p>Sign in with google</p>
        </Button>
      </div>
    </div>
  );
}

export default Login;
