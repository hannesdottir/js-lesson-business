import React, { useState } from "react";
import UserKit from "../data/UserKit";
import { useHistory } from "react-router-dom";

export default function CreateCustomer() {
  const [customerName, setCustomerName] = useState("");
  const [customerOrgNr, setCustomerOrgNr] = useState("");
  const [customerVatNr, setCustomerVatNr] = useState("");
  const [customerReference, setCustomerReference] = useState("");
  const [customerPaymentTerm, setCustomerPaymentTerm] = useState("");
  const [customerWebsite, setCustomerWebsite] = useState("");
  const [customerEmail, setCustomerEmail] = useState("");
  const [customerPhoneNr, setCustomerPhoneNr] = useState("");

  const userKit = new UserKit();

  const history = useHistory();

  function handleCreateCustomer() {
    const payload = {
      name: customerName,
      organisationNr: customerOrgNr,
      vatNr: customerVatNr,
      reference: customerReference,
      paymentTerm: customerPaymentTerm,
      website: customerWebsite,
      email: customerEmail,
      phoneNumber: customerPhoneNr,
    };
    userKit
      .createCustomer(payload)
      .then((res) => res.json())
      .then((data) => {
        //TODO ::::::::::::: När användaren har skapat hunden ska kundlistan laddas om från back-end
        history.push("/customers");
      });
  }

  return (
    <div>
      <p>Create a new customer</p>
      <input
        type="text"
        placeholder="Enter customer name"
        value={customerName}
        onChange={(e) => setCustomerName(e.target.value)}
      />
      <input
        type="number"
        placeholder="Customer organisation number"
        value={customerOrgNr}
        onChange={(e) => setCustomerOrgNr(e.target.value)}
      />
      <input
        type="number"
        placeholder="Customer vatNr"
        value={customerVatNr}
        onChange={(e) => setCustomerVatNr(e.target.value)}
      />
      <input
        type="text"
        placeholder="Customer reference"
        value={customerReference}
        onChange={(e) => setCustomerReference(e.target.value)}
      />
      <input
        type="number"
        placeholder="PaymentTerm"
        value={customerPaymentTerm}
        onChange={(e) => setCustomerPaymentTerm(e.target.value)}
      />
      <input
        type="text"
        placeholder="Website"
        value={customerWebsite}
        onChange={(e) => setCustomerWebsite(e.target.value)}
      />
      <input
        type="email"
        placeholder="Email"
        value={customerEmail}
        onChange={(e) => setCustomerEmail(e.target.value)}
      />
      <input
        type="number"
        placeholder="Phone Number"
        value={customerPhoneNr}
        onChange={(e) => setCustomerPhoneNr(e.target.value)}
      />
      <button onClick={handleCreateCustomer}>Create customer</button>
    </div>
  );
}
