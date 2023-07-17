import React, { useRef, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { auth } from "../../firebase";
import "./RegisterScreen.css";
// import Nav from "../../Nav";
// import NavBar from "../../components/Navbar/Navbar";
import NavBar from "../../components/Header/Navbar";
const RegisterScreen = () => {
  const location = useLocation();
  console.log(location.state.email);
  const emailRef = useRef(location.state.email);
  const passwordRef = useRef(null);
  const navigate = useNavigate();
  const [err, setErr] = useState(false);
  const registerHandler = (e) => {
    console.log("click");
    e.preventDefault();
    auth
      .createUserWithEmailAndPassword(
        emailRef.current,
        passwordRef.current.value
      )
      .then((authUser) => {
        console.log(authUser);
        navigate("/");
        // console.log(authUser.ba.refreshToken);
      })
      .catch((error) => {
        // alert(error.message);
        setErr(error.message);
      });
  };
  return (
    <>
      <div className="register__screen">
        <div className="header">
          <NavBar />
        </div>
        <div className="content">
          {err && <div className="err__box">{err}</div>}
          <div className="heading">
            Welcome back!
            <br /> Joining Netflix is easy.
          </div>
          <div>
            <p className="subHeading">
              Enter your password and you'll be watching in no time.
            </p>
            <p className="subHeading">
              Email <br />
              <span>{location.state.email}</span>
            </p>
          </div>
          <div className="registerScreen__form">
            <form>
              <div className="input__div">
                <input
                  placeholder="Enter Your password"
                  type="password"
                  ref={passwordRef}
                />
              </div>
              <div className="registerScreen__btn">
                <button onClick={registerHandler}>Register</button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </>
  );
};
export default RegisterScreen;
