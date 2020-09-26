import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { CustomerListContext } from "./contexts/CustomerListContext";
import styled from "styled-components";
import CustomerList from "./pages/CustomerList";
import CustomerDetail from "./pages/CustomerDetail";
import CreateCustomer from "./components/CreateCustomer";
import Registration from "./components/Registration";
import Login from "./components/Login";

function App() {
  //Logged in user:
  const [loggedInUser, setLoggedInUser] = useState(null);

  //CustomerList
  const [customerList, setCustomerList] = useState([]);

  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  const RegistrationWrapper = styled.div`
    display: flex;
    flex-direction: row;
  `;

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <Wrapper>
        <h1>Inlämningsuppgift - Javascript 3</h1>

        <Switch>
          <Route path="/customers/:slug" component={CustomerDetail} />

          <Route path="/home">
            <CustomerList />
            <CreateCustomer />
          </Route>

          <Route path="/login">
            <Login />
          </Route>

          <Route path="/">
            <RegistrationWrapper>
              <Registration />
            </RegistrationWrapper>
          </Route>
        </Switch>
      </Wrapper>
    </UserContext.Provider>
  );
}

export default App;
