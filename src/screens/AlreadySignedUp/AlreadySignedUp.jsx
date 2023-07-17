import React from "react";
import { Link } from "react-router-dom";
import "./AlreadySignedUp.css";

function AlreadySignedUp() {
  return (
    <div className="signedupScreen">
      <div className="loginScreen__gadient" />
      <div className="signedupScreen__box">
        <h1> You are signed in already</h1>
        <Link to="/">
          <div style={{ justifyItems: "center" }}>
            <button type="submit"> Back to Home page </button>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default AlreadySignedUp;
