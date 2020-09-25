import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import UserKit from "./data/UserKit";
import styled from "styled-components";
import CustomerList from "./pages/CustomerList";
import CustomerDetail from "./pages/CustomerDetail";
import CreateCustomer from "./components/CreateCustomer";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //-----
  const [organisationName, setOrganisationName] = useState("");
  const [organisationKind, setOrganisationKind] = useState("");

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  //Logged in user:
  const [loggedInUser, setLoggedInUser] = useState({ name: "hej" });

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
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <Wrapper>
        <h1>Inlämningsuppgift - Javascript 3</h1>

        <Switch>
          <Route path="/home">
            <h1>Welcome!</h1>
          </Route>

          <Route path="/customers/:slug" component={CustomerDetail} />

          <Route path="/customers">
            <CustomerList />
            <CreateCustomer />
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
    </UserContext.Provider>
  );
}

export default App;
