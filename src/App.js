import React, { useState } from "react";
import { Switch, Route, useHistory } from "react-router-dom";
import UserKit from "./data/UserKit";
import styled from "styled-components";

function App() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [customerList, setCustomerList] = useState([]);

  //Create new customer
  const [customerName, setCustomerName] = useState("");
  const [customerOrgNr, setCustomerOrgNr] = useState("");
  const [customerVatNr, setCustomerVatNr] = useState("");
  const [customerReference, setCustomerReference] = useState("");
  const [customerPaymentTerm, setCustomerPaymentTerm] = useState("");
  const [customerWebsite, setCustomerWebsite] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhoneNr, setCustomerPhoneNr] = useState("");

  //-----
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

  function getAllCustomers() {
    console.log("getAllCustomers started");
    userKit
      .getCustomerList()
      .then((res) => res.json())
      .then((data) => {
        setCustomerList(data.results);
      });
  }

  function handleCreateCustomer() {
    const payload = {
      name: customerName,
      customerName: customerName,
      customerOrgNr: customerOrgNr,
      customerVatNr: customerVatNr,
      customerReference: customerReference,
      customerPaymentTerm: customerPaymentTerm,
      customerWebsite: customerWebsite,
      customerEmail: customerEmail,
      customerPhoneNr: customerPhoneNr,
      customerOrgNr: customerOrgNr,
    };
    userKit
      .createCustomer(payload)
      .then((res) => res.json())
      .then((data) => {
        console.log(data);
        getAllCustomers();
      });
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
    <Wrapper>
      <h1>Business Project</h1>

      <Switch>
        <Route path="/home">
          <div>
            <Home>
              <h1>Home</h1>
              <button onClick={getAllCustomers}>Get all customers</button>
              {customerList.map((customerItem) => {
                return <p> Name: {customerItem.name}</p>;
              })}

              <div>
                <p>Create a new customer</p>
                <input
                  placeholder="Enter customer name"
                  value={customerName}
                  onChange={(e) => setCustomerName(e.target.value)}
                />
                <input
                  placeholder="Customer organisation number"
                  value={customerOrgNr}
                  onChange={(e) => setCustomerOrgNr(e.target.value)}
                />
                <input
                  placeholder="Customer vatNr"
                  value={customerVatNr}
                  onChange={(e) => setCustomerVatNr(e.target.value)}
                />

                <input
                  placeholder="Customer reference"
                  value={customerReference}
                  onChange={(e) => setCustomerReference(e.target.value)}
                />
                <input
                  placeholder="PaymentTerm"
                  value={customerPaymentTerm}
                  onChange={(e) => setCustomerPaymentTerm(e.target.value)}
                />
                <input
                  placeholder="Website"
                  value={customerWebsite}
                  onChange={(e) => setCustomerWebsite(e.target.value)}
                />
                <input
                  placeholder="Email"
                  value={customerEmail}
                  onChange={(e) => setCustomerEmail(e.target.value)}
                />
                <input
                  placeholder="Phone Number"
                  value={customerPhoneNr}
                  onChange={(e) => setCustomerPhoneNr(e.target.value)}
                />

                <button onClick={handleCreateCustomer}>Create customer</button>
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
