import React, { useState, useEffect, useContext } from "react";
import CustomerList from "./CustomerList";
import CreateCustomer from "../components/CreateCustomer";

export default function Home() {
  const [customerList, setCustomerList] = useState([]);

  return (
    <>
      <CustomerList />
      <CreateCustomer />
    </>
  );
}
