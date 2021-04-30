import React, { useState, useRef, useEffect } from "react";

import { Link, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../../actions";

export default function Header() {
  const dispatch = useDispatch();
  const history = useHistory();
  const innerRef = useOuterClick(hide);

  const { user } = useSelector(state => state.auth);
  const [isVisible, setVisibility] = useState(false);

  function show() {
    setVisibility(true);
  }
  function hide() {
    setVisibility(false);
  }
  function logout() {
    dispatch(authActions.logout(history));
  }

  return (
    <>
      <nav className="navbar navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <div className="mr-auto" />
        <div ref={innerRef}>
          <a href="javascript:void(0);" onClick={show}>
            <div>{user?.name?.first}</div>
          </a>
          <ul
            className={
              "dropdown-menu dropdown-menu-right " + (isVisible ? "show" : "")
            }
          >
            <a className="dropdown-item" href="javascript:void(0);">
              <Link to="/register">Edit Profile</Link>
            </a>
            <a className="dropdown-item" onClick={logout}>
              Logout
            </a>
          </ul>
        </div>
      </nav>
    </>
  );
}

function useOuterClick(callback) {
  const callbackRef = useRef(); // initialize mutable callback ref
  const innerRef = useRef(); // returned to client, who sets the "border" element

  // update callback on each render, so second useEffect has most recent callback
  useEffect(() => {
    callbackRef.current = callback;
  });
  useEffect(() => {
    document.addEventListener("click", handleClick);
    return () => document.removeEventListener("click", handleClick);
    function handleClick(e) {
      if (
        innerRef.current &&
        callbackRef.current &&
        !innerRef.current.contains(e.target)
      )
        callbackRef.current(e);
    }
  }, []); // no dependencies -> stable click listener

  return innerRef; // convenience for client (doesn't need to init ref himself)
}
