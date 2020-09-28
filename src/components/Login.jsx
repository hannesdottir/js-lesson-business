import React, { useState, useContext } from "react";
import UserKit from "../data/UserKit";
import { UserContext } from "../contexts/UserContext";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const Input = styled.input`
  margin-bottom: 1rem;
  height: 20px;
  border: solid 1px black;
`;

const Button = styled.button`
  background-color: peachpuff;
  font-size: 1em;
  font-weight: 600;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
`;

const LoginHeading = styled.h2`
  text-align: center;
  margin-top: 5rem;
`;

const ActivateAccountWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;
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
        history.push("/home");
      });
  }

  return (
    <div>
      {uid && token ? (
        <ActivateAccountWrapper>
          <h2>Activate Account</h2>
          <Button onClick={handleActivateUser}>Activate User</Button>
        </ActivateAccountWrapper>
      ) : (
        <div>
          <LoginHeading>Login</LoginHeading>

          <Input
            placeholder="Email"
            value={loginEmail}
            onChange={(e) => setLoginEmail(e.target.value)}
          />
          <Input
            placeholder="Password"
            value={loginPassword}
            onChange={(e) => setLoginPassword(e.target.value)}
          />

          <Button onClick={handleLogin}>Login</Button>
        </div>
      )}
    </div>
  );
}
