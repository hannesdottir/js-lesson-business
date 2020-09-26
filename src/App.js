import React, { useState } from "react";
import { Switch, Route } from "react-router-dom";
import { UserContext } from "./contexts/UserContext";
import { CustomerListContext } from "./contexts/CustomerListContext";
import styled from "styled-components";
import CustomerList from "./pages/CustomerList";
import CustomerDetail from "./pages/CustomerDetail";
import CreateCustomer from "./components/CreateCustomer";
import Home from "./pages/Home";
import Registration from "./components/Registration";
import Login from "./components/Login";

function App() {
  //Logged in user:
  const [loggedInUser, setLoggedInUser] = useState(null);

  //CustomerList
  const [customerList, setCustomerList] = useState([]);

  const Heading = styled.h1`
    font-size: 18px;
  `;
  const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
  `;

  return (
    <UserContext.Provider value={{ loggedInUser, setLoggedInUser }}>
      <CustomerListContext.Provider value={{ customerList, setCustomerList }}>
        <Wrapper>
          <Heading>Javascript 3</Heading>

          <Switch>
            <Route path="/customers/:slug" component={CustomerDetail} />

            <Route path="/home">
              <Home />
              {/* <CustomerList />
              <CreateCustomer /> */}
            </Route>

            <Route path="/login">
              <Login />
            </Route>

            <Route path="/">
              <Registration />
            </Route>
          </Switch>
        </Wrapper>
      </CustomerListContext.Provider>
    </UserContext.Provider>
  );
}

export default App;
