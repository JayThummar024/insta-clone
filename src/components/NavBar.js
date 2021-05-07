import React from "react";
import { Link , useHistory} from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { userLogout } from "../redux/actions";

function NavBar() {
  const isLoggedIn = useSelector((state) => state.isLoggedIn);
  const dispatch = useDispatch();
  const history = useHistory()

  function logoutUser() {
    localStorage.clear();
    dispatch(userLogout());
    history.push("/signin")
  }

  function renderNavLinks() {
    if (isLoggedIn) {
      return [
        <li key="1">
          <Link to="/following">My Following</Link>
        </li>,
        <li key="1">
          <Link to="/profile">Profile</Link>
        </li>,
        <li key="2">
          <Link to="/createpost">Create Post</Link>
        </li>,
          <button key="5"
            className="waves-effect waves-light btn logout-btn"
            onClick={logoutUser}
          >
            Logout
          </button>
        
      ];
    } else {
      return [
        <li key="3">
          <Link to="/signin">SignIn</Link>
        </li>,
        <li key="4">
          <Link to="/signup">SignUp</Link>
        </li>,
      ];
    }
  }

  return (
    <>
      <nav>
        <div className="nav-wrapper">
          <Link to={isLoggedIn ? "/" : "/signin"} className="brand-logo">
            Instagram
          </Link>
          <ul id="nav-mobile" className="right hide-on-med-and-down">
            {renderNavLinks()}
          </ul>
        </div>
      </nav>
    </>
  );
}

export default NavBar;
