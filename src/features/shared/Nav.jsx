import React from "react";
import "./Nav.css";
import { NavLink, useHistory } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import api from "../../app/api";
import { logout } from "../user/userSlice";

function Nav() {
  const loggedIn = useSelector((state) => state.user.loggedIn);
  const history = useHistory();
  const dispatch = useDispatch();

  const handleLogout = (e) => {
    e.preventDefault();

    //Clear local storage key
    localStorage.removeItem("token");

    // actulizar instancia de axios
    api.defaults.headers["Authorization"] = null;

    // redireccionar a tweets
    history.push("/login");

    //Change state
    dispatch(logout());
  };

  return (
    <ul className="nav">
      {loggedIn ? (
        <>
          <li>
            <NavLink to="/tweets" activeClassName="active">
              Tweets
            </NavLink>
          </li>
          <li>
            <NavLink to="/new-tweet" activeClassName="active">
              Add tweet
            </NavLink>
          </li>
          <li>
            <a href="/" onClick={handleLogout}>
              Logout
            </a>
          </li>
        </>
      ) : (
        <>
          <li>
            <NavLink to="/login" activeClassName="active">
              Login
            </NavLink>
          </li>
          <li>
            <NavLink to="/signup" activeClassName="active">
              Signup
            </NavLink>
          </li>
        </>
      )}
    </ul>
  );
}

export default Nav;
