import React, { useState, useEffect } from "react";
import UserKit from "../data/UserKit";
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
  const [customerList, setCustomerList] = useState([]);
  const userKit = new UserKit();

  useEffect(() => {
    //  userKit.deleteCustomer(978);
    //göra knapp/ använd id-et.
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

/*
Objects are not valid as a React child (found: object with keys 
  {id, parent, name, organisationNr, vatNr, reference, paymentTerm,
     website, email, phoneNumber, address}).
 If you meant to render a collection of children, use an array instead.*/
