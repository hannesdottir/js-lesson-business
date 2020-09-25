import React, { useState, useEffect, useContext } from "react";
import UserKit from "../data/UserKit";
import Header from "../components/Header";
import { UserContext } from "../contexts/UserContext";
import { CustomerListContext } from "../contexts/CustomerListContext";
import { Link } from "react-router-dom";

export default function CustomerList() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const { customerList, setCustomerList } = useContext(CustomerListContext);

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
  }, [customerList]);

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
    <div>
      <Header />
      <h2>All customers</h2>

      {customerList &&
        customerList.map((customerItem) => {
          return (
            <div key={customerItem.id}>
              <Link to={`/customers/${customerItem.id}`}>
                {customerItem.name}
              </Link>
            </div>
          );
        })}
    </div>
  );
}
