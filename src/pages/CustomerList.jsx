import React, { useState, useEffect, useContext } from "react";
import UserKit from "../data/UserKit";
import Header from "../components/Header";
import { UserContext } from "../contexts/UserContext";
import { Link } from "react-router-dom";

export default function CustomerList({
  name,
  orgNr,
  vatNr,
  ref,
  paymentTerm,
  website,
  email,
  phoneNr,
}) {
  const contextValue = useContext(UserContext);
  const { loggedInUser } = contextValue;

  console.log("Innehåll av contextValue", contextValue.loggedInUser);
  const [customerList, setCustomerList] = useState([]);
  const userKit = new UserKit();

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
