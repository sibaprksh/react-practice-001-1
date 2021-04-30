import React, { useEffect } from "react";
import { Switch, Route, Redirect, useLocation } from "react-router-dom";

import { Provider, useDispatch, useSelector } from "react-redux";

import { alertActions } from "../../actions";

// components
import { Home, Login, Register } from "../index";

import "./App.css";

export default function App() {
  const dispatch = useDispatch();
  const location = useLocation();

  const alert = useSelector(state => state.alert);

  useEffect(() => {
    setTimeout(clearAlert, 1000);
  }, [location]);

  // alert.message = "test";
  // alert.type = "alert-success";

  function clearAlert() {
    dispatch(alertActions.clear());
  }

  return (
    <>
      {alert.message && (
        <div id="alert">
          <div style={{ padding: "15px" }}>
            <div className={`alert ${alert.type}`} style={{ margin: "0 auto" }}>
              <button
                type="button"
                className="close"
                data-dismiss="alert"
                onClick={clearAlert}
              >
                &times;
              </button>
              {alert.message}
            </div>
          </div>
        </div>
      )}
      <Switch>
        <PrivateRoute exact path="/" component={Home} />
        <HomeRout path="/login" component={Login} />
        <HomeRout path="/register" component={Register} />
        <Redirect from="*" to="/" />
      </Switch>
    </>
  );
}

function HomeRout({ component: Component, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (localStorage.getItem("user")) {
          // logged in so redirect to home
          return <Redirect to={{ pathname: "/" }} />;
        }
        // not logged in so return component
        return <Component {...props} />;
      }}
    />
  );
}

function PrivateRoute({ component: Component, roles, ...rest }) {
  return (
    <Route
      {...rest}
      render={props => {
        if (!localStorage.getItem("user")) {
          // not logged in so redirect to login page with the return url
          return (
            <Redirect
              to={{ pathname: "/login", state: { from: props.location } }}
            />
          );
        }

        // logged in so return component
        return <Component {...props} />;
      }}
    />
  );
}
