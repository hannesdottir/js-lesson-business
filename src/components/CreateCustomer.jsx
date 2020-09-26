import React, { useState, useEffect } from "react";
import UserKit from "../data/UserKit";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

const CreateCustomerStyle = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
`;

const Button = styled.button`
  background-color: peachpuff;
  font-size: 1em;
  font-weight: 600;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  height: 20px;
  border: solid 1px black;
`;

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
        //TODO ::::::::::::: När användaren har skapat kunden ska kundlistan laddas om från back-end
        history.push("/home");
      });
  }

  return (
    <div>
      <CreateCustomerStyle>
        <h2>Create a new customer</h2>
        <label>Customer name</label>
        <Input
          type="text"
          value={customerName}
          onChange={(e) => setCustomerName(e.target.value)}
        />
        <label>Organisation number</label>
        <Input
          type="number"
          value={customerOrgNr}
          onChange={(e) => setCustomerOrgNr(e.target.value)}
        />
        <label>VatNr</label>
        <Input
          type="number"
          value={customerVatNr}
          onChange={(e) => setCustomerVatNr(e.target.value)}
        />
        <label>Customer reference</label>
        <Input
          type="text"
          value={customerReference}
          onChange={(e) => setCustomerReference(e.target.value)}
        />
        <label>Payment Term</label>
        <Input
          type="number"
          value={customerPaymentTerm}
          onChange={(e) => setCustomerPaymentTerm(e.target.value)}
        />
        <label>Website</label>
        <Input
          type="text"
          value={customerWebsite}
          onChange={(e) => setCustomerWebsite(e.target.value)}
        />
        <label>Email</label>
        <Input
          type="email"
          value={customerEmail}
          onChange={(e) => setCustomerEmail(e.target.value)}
        />
        <label>Phone number</label>
        <Input
          type="number"
          value={customerPhoneNr}
          onChange={(e) => setCustomerPhoneNr(e.target.value)}
        />
        <Button onClick={handleCreateCustomer}>Create customer</Button>
      </CreateCustomerStyle>
    </div>
  );
}
