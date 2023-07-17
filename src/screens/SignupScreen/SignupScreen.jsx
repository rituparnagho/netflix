import React, { useState } from "react";
import "./SignupScreen.css";
import LoginScreen from "../LoginScreen/LoginScreen";
import RegisterScreen from "../RegisterScreen/RegisterScreen";
import { Link } from "react-router-dom";
// import NavBar from "../../components/Navbar/Navbar";
import NavBar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";

function SignupScreen() {
  const [signIn, setSignIn] = useState(false);
  const [email, setEmail] = useState("");
  return (
    <>
      <div className="loginScreen">
        <div className="loginScreen_background">
          {/* <img
          className="loginScreen_logo"
          src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
          alt=""
        /> */}
          <NavBar />
          {/* <button onClick={()=> setSignIn(true)}
        className='loginScreen_button'>
          Sign In
        </button> */}
          {/* <Link to="/">
          <button
            className="loginScreen_button"
            // onClick={() => setSignin(true)}
          >
            Sign In
          </button>
        </Link> */}
          <div className="loginScreen_gradient"></div>
          <div className="loginScreen_body">
            {signIn ? (
              <LoginScreen />
            ) : (
              <>
                <h1>Unlimited films, TV programmes and more.</h1>
                <h2>Watch anywhere. Cancel at any time</h2>
                <h3>
                  Ready to watch? Enter your email to create or restart your
                  membership.
                </h3>
                <div className="signupScreen_input">
                  <form className="signupScreen_form">
                    <input
                      value={email}
                      type="email"
                      placeholder="Email Address"
                      onChange={(e) => setEmail(e.target.value)}
                    />
                    <Link to="/register" state={{ id: 1, email: email }}>
                      <button
                        className="loginScreen_getStarted"
                        disabled={!email}
                      >
                        GET STARTED
                      </button>
                    </Link>
                  </form>
                </div>
              </>
            )}
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
}

export default SignupScreen;
