import React, { useState, useContext } from "react";
import UserKit from "../data/UserKit";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";

export default function Login() {
  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const history = useHistory();
  //get searchString from the history variable.
  const searchString = history.location.search;

  //built-in javascript method to create urlParameters object
  const urlParameters = new URLSearchParams(searchString);

  //get default values from url parameters
  const [uid, setUid] = useState(urlParameters.get("uid"));
  const [token, setToken] = useState(urlParameters.get("token"));

  const userKit = new UserKit();
  //console.log(searchString);

  function handleActivateUser() {
    userKit.activateUser(uid, token).then(() => {
      setUid(null);
      setToken(null);
      //navigate user to login once activeUser is done
      history.push("/login");
    });
  }

  function handleLogin() {
    console.log("handleLogin started");
    userKit
      .login(loginEmail, loginPassword)
      .then((res) => res.json())
      .then((data) => {
        console.log("handleLogin response: ", JSON.stringify(data));
        userKit.setToken(data.token);
        //TO DO ::::::::::::::: usecontext hämta login info
        history.push("/home");
      });
  }

  return (
    <div>
      {uid && token ? (
        <div>
          <h2>Activate Account</h2>
          <button onClick={handleActivateUser}>Activate User</button>
        </div>
      ) : (
        <div>
          <h2>Login</h2>
          <input
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <input
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />
          <button onClick={handleLogin}>Login</button>
        </div>
      )}
    </div>
  );
}
