import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import { selectUser } from "../../features/userSlice";
import "./Navbar.css";
import { BsSearch } from "react-icons/bs";
import { GiHamburgerMenu } from "react-icons/gi";

const Navbar = () => {
  const [show, handleShow] = useState(false);
  const user = useSelector(selectUser);
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(true);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const transitionNavbar = () => {
    if (window.scrollY > 10) {
      handleShow(true);
    } else {
      handleShow(false);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", transitionNavbar);
    return () => window.removeEventListener("scroll", transitionNavbar);
  }, []);

  const renderMenu = () => {
    if (
      user &&
      location.pathname !== "/login" &&
      location.pathname !== "/signup"
    ) {
      return (
        <>
          <li className="nav__hamMenu" onClick={toggleMenu}>
            <GiHamburgerMenu />
          </li>
          <li className="nav__search">
            <Link to="/search">
              <BsSearch />
            </Link>
          </li>
          <li>
            <Link to="/profile">
              <img
                className="nav__avatar"
                src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
                alt="avatar"
              />
            </Link>
          </li>
          {isOpen && (
            <>
              <div className="hamburgar-menu">
                <li>
                  <Link to="/">Home</Link>
                </li>
                <li>
                  <Link to="/tv-shows">Tv Shows</Link>
                </li>
                <li>
                  <Link to="/movie-shows">Movies</Link>
                </li>
                <li>
                  <Link to="/popular">New & Popular</Link>
                </li>
                <li>
                  <Link to="/wishlist">My List</Link>
                </li>
                {/* <li>
                  <Link to="/category">Category</Link>
                </li> */}
              </div>
            </>
          )}
        </>
      );
    } else {
      return (
        <Link to="/">
          <button className="nav__button">Sign In</button>
        </Link>
      );
    }
  };

  return (
    <>
      <div className={`nav ${show && "nav__black"}`}>
        <div className="nav__contents">
          <ul class="menu-nav-items">
            <li>
              <Link to="/">
                <img className="nav__logo" src="/netflix_logo.png" alt="" />
              </Link>
            </li>
            {renderMenu()}
          </ul>
        </div>
      </div>
    </>
  );
};

export default Navbar;

// import React, { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
// import { Link } from "react-router-dom";
// import { selectUser } from "../../features/userSlice";
// import "./Navbar.css";
// import { BsSearch } from "react-icons/bs";
// import { GiHamburgerMenu } from "react-icons/gi";

// const Navbar = () => {
//   const [show, handleShow] = useState(false);
//   const user = useSelector(selectUser);
//   const [isOpen, setIsOpen] = useState(true);

//   const toggleMenu = () => {
//     setIsOpen(!isOpen);
//   };

//   const transitionNavbar = () => {
//     console.log("window.scrollY", window.scrollY);
//     if (window.scrollY > 100) {
//       handleShow(true);
//     } else {
//       handleShow(false);
//     }
//   };

//   useEffect(() => {
//     window.addEventListener("scroll", transitionNavbar);
//     return () => window.removeEventListener("scroll", transitionNavbar);
//   }, []);

//   return (
//     <>
//       <div className={`nav ${show && "nav__black"}`}>
//         <div className="nav__contents">
//           {/* <div className="menu-nav"> */}
//           <ul class="menu-nav-items">
//             <li>
//               <Link to="/">
//                 <img
//                   className="nav__logo"
//                   // src="https://upload.wikimedia.org/wikipedia/commons/7/7a/Logonetflix.png"
//                   src="/netflix_logo.png"
//                   alt=""
//                 />
//               </Link>
//             </li>
//             <li className="nav__hamMenu" onClick={toggleMenu}>
//               <GiHamburgerMenu />
//             </li>
//             {user ? (
//               <>
//                 <li className="nav__search">
//                   <Link to="/search">
//                     <BsSearch />
//                   </Link>
//                 </li>
//                 <li>
//                   <Link to="/profile">
//                     <img
//                       className="nav__avatar"
//                       src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png"
//                       alt="avatar"
//                     />
//                   </Link>
//                 </li>
//                 {isOpen && (
//                   <>
//                     <div className="hamburgar-menu">
//                       <li>
//                         <Link to="/">Home</Link>
//                       </li>
//                       <li>
//                         <Link to="/tv-shows">Tv Shows</Link>
//                       </li>
//                       <li>
//                         <Link to="/movie-shows">Movies</Link>
//                       </li>
//                       <li>
//                         <Link to="/popular">New & Popular</Link>
//                       </li>
//                       <li>
//                         <Link to="/wishlist">My List</Link>
//                       </li>
//                       {/* <li>
//                         <Link to="/category">Category</Link>
//                       </li> */}
//                     </div>
//                   </>
//                 )}
//               </>
//             ) : (
//               <>
//                 <Link to="/">
//                   <button className="nav__button">Sign In</button>
//                 </Link>
//               </>
//             )}
//           </ul>
//           {/* </div> */}
//         </div>
//       </div>
//     </>
//   );
// };

// export default Navbar;
