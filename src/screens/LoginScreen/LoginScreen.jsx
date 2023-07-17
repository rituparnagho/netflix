import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
// import LoginScreen from "./SignupScreen";
import "./LoginScreen.css";
// import NavBar from "../../components/Navbar/Navbar";
import NavBar from "../../components/Header/Navbar";
import Footer from "../../components/Footer/Footer";

function LoginScreen() {
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [err, setErr] = useState(false);
  // const [showComponent, setShowComponent] = useState(false);

  // console.log(showComponent, "showComponent");
  const handleClick = () => {
    // setShowComponent(true);
    navigate("/");
  };

  const signIn = (e) => {
    e.preventDefault();
    auth
      .signInWithEmailAndPassword(
        emailRef.current.value,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
        navigate("/");
      })
      .catch((error) => {
        // alert(error.message);
        setErr(error.message);
      });
  };
  return (
    <>
      <div className="loginScreen">
        <div className="loginScreen__gadient" />
        {/* <div className="loginScreen__background"> */}
        {/* <img className="loginScreen__logo" src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png" alt="" /> */}
        <NavBar />
        <div className="loginScreen__box">
          {err && <div className="err__box">{err}</div>}
          <form>
            <h1>Sign In</h1>
            <input ref={emailRef} placeholder="Email" type="email" />
            <input ref={passwordRef} placeholder="Password" type="password" />
            <button type="submit" onClick={signIn}>
              Sign In
            </button>
            <h4>
              <span className="loginScreen__box_gray">New to Netflix? </span>
              {/* <span className="loginScreen__box_link" onClick={register}>
            Sign Up now.
          </span> */}
              <span className="loginScreen__box_link">
                <Link to="/signup">Sign Up now.</Link>
              </span>
            </h4>
          </form>
        </div>
        {/* </div> */}
      </div>
      <Footer />
    </>
  );
}

export default LoginScreen;
