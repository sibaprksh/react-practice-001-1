import React, { useEffect } from "react";
import { useLocation } from "react-router-dom";

import { useDispatch, useSelector } from "react-redux";

import { alertActions } from "../../actions";

// components
import { Header, Route } from "../index";

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
      <Header />
      <div style={{ "padding-top": "56px" }}>
        <Route />
      </div>
    </>
  );
}
