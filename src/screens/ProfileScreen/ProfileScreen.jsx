import React from "react";
import "./ProfileScreen.css";
// import Nav from "../../Nav"
import { auth } from "../../firebase";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectUser } from "../../features/userSlice";
import PlansScreen from "../PlansScreen/PlansScreen";
import { useNavigate } from "react-router-dom";
// import NavBar from "../../components/Navbar/Navbar";
import NavBar from "../../components/Header/Navbar";

function ProfileScreen() {
  const user = useSelector(selectUser);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const logOut = (e) => {
    e.preventDefault();
    auth
      .signOut()
      .then((authUser) => {
        dispatch(logout());
        console.log(authUser);
        navigate("/");
      })
      .catch((error) => {
        alert(error.message);
      });
  };
  return (
    <div className="profileScreen">
      <NavBar />
      <div className="profileScreen_body">
        <h1>Edit Profile</h1>
        <div className="profileScreen_info">
          <img
            src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
            alt=""
          />
          <div className="profileScreen_details">
            <h2>{user.email}</h2>
            <div className="profileScreen_plans">
              {/* <h3>Plans</h3> */}
              <PlansScreen />
              <button onClick={logOut} className="profileScreen_signOut">
                Sign Out
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProfileScreen;
