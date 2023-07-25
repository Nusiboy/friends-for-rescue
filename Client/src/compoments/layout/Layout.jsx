import React from "react";
import { useState } from "react";
import "../layout/Layout.css"
import { Outlet, Link } from "react-router-dom";
import MobileButton from "../mobileButton/MobileButton"
function Layout() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  return (
    <div>
      <div id="layoutMain">
        <div id="layoutHeader">
          <div id="mobileLinks">
            <MobileButton isMenu={isMenuOpen} setMenu={setIsMenuOpen} />
          </div>
          <div id="layoutLinks">
            <Link className="headerLink" to={"/Login"}>
              Login
            </Link>
            <Link className="headerLink" to={"/Register"}>
              Register
            </Link>
            <Link className="headerLink" to={"/"}>
              Map
            </Link>
          </div>
        </div>
        {isMenuOpen && (
          <div id="divLinks">
            <Link className="headerLink" onClick={() => {
                setIsMenuOpen(false);
              }} to={"/Login"}>
              Login
            </Link>
            <Link className="headerLink" onClick={() => {
                setIsMenuOpen(false);
              }}to={"/Register"}>
              Register
            </Link>
            <Link className="headerLink" onClick={() => {
                setIsMenuOpen(false);
              }}to={"/"}>
              Map
            </Link>
          </div>
        )}
        <div id="layoutContent">
            <Outlet />
        <div id="layoutFooter">
            <div id="footerLinks">
              <div className="footerColumnLink">
                <div className="dummyLink">FAQ</div>
                <div className="dummyLink">Privacy Policy</div>
                <div className="dummyLink">Terms and Conditions</div>
              </div>
              <div className="footerColumnLink">
                <div className="dummyLink">Blog</div>
                <div className="dummyLink">Testimonials</div>
                <div className="dummyLink">Our Team</div>
              </div>
              <div className="footerColumnLink">
                <div className="dummyLink">Support</div>
                <div className="dummyLink">Gallery</div>
                <div className="dummyLink">Newsletter</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
export default Layout;
