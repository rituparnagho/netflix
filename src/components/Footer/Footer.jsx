import React from "react";
import "./Footer.css";
const Footer = () => {
  return (
    <>
      <div className="footer">
        <div className="footer__top">
          <div className="col-1">
            <p>FAQ</p>
            <p>Investor Relations</p>
            <p>Ways to Watch</p>
            <p>Corporate Information</p>
            <p>Netflix Originals</p>
          </div>
          <div className="col-1">
            <p>Help Centers</p>
            <p>Jobs</p>
            <p>Terms of use</p>
            <p>Contact us</p>
          </div>
          <div className="col-1">
            <p>Account</p>
            <p>Gift card</p>
            <p>Privacyh</p>
            <p>Speed Test</p>
          </div>
          <div className="col-1">
            <p>Media Center</p>
            <p>Buy gifty cards</p>
            <p>Cookie prefrence</p>
            <p>Legal notices</p>
          </div>
        </div>
      </div>
      <div className="footer__bottom">
        Created by <span>Rituparna Ghosh</span>
        copyright @ {new Date().getFullYear()}
      </div>
    </>
  );
};
export default Footer;
