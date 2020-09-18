import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import UserKit from "./data/UserKit";
import styled from "styled-components";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [organisationKind, setOrganisationKind] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const history = useHistory();
  //plocka ut searchstring från history variabeln
  const searchString = history.location.search;
  //Innbyggd javascript metod - skapa urlParameters objekt
  const urlParameters = new URLSearchParams(searchString);

  //hämtar default värdena från våra url parametrar.
  const [uid, setUid] = useState(urlParameters.get("uid"));
  const [token, setToken] = useState(urlParameters.get("token"));

  const userKit = new UserKit();
  console.log(searchString);

  function handleActivateUser() {
    userKit.activateUser(uid, token).then(() => {
      setUid(null);
      setToken(null);
      //navigera användaren till /login så fort activateUser är klart
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

  function handleRegister() {
    console.log("handleRegister started");
    userKit.register(
      firstName,
      lastName,
      email,
      password,
      organisationName,
      organisationKind
    );
  }

  const [customers, setCustomers] = useState([]);
  function getCustomerList() {
    userKit
      .getCustomerList()
      .then((res) => res.json())
      .then((data) => {
        console.log("data ", JSON.stringify(data));
        if (data && data.results && data.results.length > 0) {
          setCustomers(data.results);
        }
      });
  }

  /*
  function renderInput(placeholder, stateVariable, stateSetVariable) {
    return (
      <input
        placeholder={placeholder}
        value={stateVariable}
        onchange={(e) => stateSetVariable(e.target.value)}
      />
    );
  }
*/

  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const Home = styled.div`
    display: flex;
    flex-direction: column;
  `;

  const StartPage = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 50%;
  `;

  return (
    <Wrapper>
      <h1>Business Project</h1>

      <Switch>
        <Route path="/home">
          <div>
            <Home>
              <h1>Home</h1>
              <button onClick={getCustomerList}>Get customers</button>
              <div>
                {customers &&
                  customers.map((customer) => {
                    return <div>Name: {customer.name}</div>;
                  })}
              </div>
            </Home>
          </div>
        </Route>

        <Route path="/login">
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
        </Route>
        <Route path="/">
          <StartPage>
            <h2>Register</h2>
            <p>Enter details to register</p>

            <input
              placeholder="First Name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
            />
            <input
              placeholder="Last Name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
            />
            <input
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <input
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <input
              placeholder="Organisation Name"
              value={organisationName}
              onChange={(e) => setOrganisationName(e.target.value)}
            />
            <input
              placeholder="Organisation Kind (0,1,2)"
              value={organisationKind}
              onChange={(e) => setOrganisationKind(e.target.value)}
            />
            <button onClick={handleRegister}>Register</button>
          </StartPage>
        </Route>
      </Switch>
    </Wrapper>
  );
}

export default App;

/*
email: mian@willandskill.se
password: js-fend-19
*/
