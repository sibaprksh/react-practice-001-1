import React from "react";
import { Link, useLocation, useHistory } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import { authActions } from "../../actions";

export default function Home() {
  const dispatch = useDispatch();
  const history = useHistory();
  return (
    <div>
      <h1> Home !! </h1>
      <p>
        <a onClick={() => dispatch(authActions.logout(history))}>Logout</a>
      </p>
    </div>
  );
}
