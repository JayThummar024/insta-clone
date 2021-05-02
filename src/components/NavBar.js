import React from "react";
import { Link } from "react-router-dom";


function NavBar() {
  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <Link to="/" className="brand-logo">Instagram</Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            <li><Link to="/signin">SignIn</Link></li>
            <li><Link to="/signup">SignUp</Link></li>
            <li><Link to="/profile">Profile</Link></li>
            <li><Link to="/createpost">Create Post</Link></li>
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
