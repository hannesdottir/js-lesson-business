import React, { useState, useEffect, useContext } from "react";
import CustomerList from "../components/CustomerList";
import CreateCustomer from "../components/CreateCustomer";
import UserKit from "../data/UserKit";
import { UserContext } from "../contexts/UserContext";

export default function Home() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [customerList, setCustomerList] = useState([]);

  const userKit = new UserKit();

  //only get logged in user once
  useEffect(() => {
    if (!loggedInUser) {
      getLoggedInUser();
    }
  }, []);

  function getLoggedInUser() {
    userKit
      .getLoggedInUser()
      .then((res) => res.json())
      .then((data) => {
        setLoggedInUser(data);
        console.log("getloggedinuser", data);
      });
  }

  useEffect(() => {
    getCustomerList();
  }, []);

  function getCustomerList() {
    console.log("getCustomerList started");
    userKit
      .getCustomerList()
      .then((res) => res.json())
      .then((data) => {
        setCustomerList(data.results);
        console.log(data.results);
      });
  }
  return (
    <>
      <CustomerList
        customerList={customerList}
        setCustomerList={setCustomerList}
      />
      <CreateCustomer getCustomerList={getCustomerList} />
    </>
  );
}
