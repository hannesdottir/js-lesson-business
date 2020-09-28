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

const CreateCustomerForm = styled.form`
  display: flex;
  flex-direction: column;
`;

export default function CreateCustomer({ getCustomerList }) {
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
    if (validateVatNr(customerVatNr) === false) {
      alert("You have to write SE followed by 10 numbers");
      return;
    }
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
        setCustomerName("");
        setCustomerOrgNr("");
        setCustomerVatNr("");
        setCustomerReference("");
        setCustomerPaymentTerm("");
        setCustomerWebsite("");
        setCustomerEmail("");
        setCustomerPhoneNr("");

        //refresh customer list
        getCustomerList();
        history.push("/home");
      });
  }

  function validateVatNr(customerVatNr) {
    let approvedVatNrRegex = /(SE)?[0-9]{10}/;
    if (!customerVatNr) {
      // console.log("customervatnr empty");
      return false;
    }
    let isValidVatNr = approvedVatNrRegex.test(customerVatNr);
    //console.log("isvalidatevatnr: ", isValidVatNr);
    if (customerVatNr.startsWith("SE") && isValidVatNr) {
      return true;
    }
    return false;
  }

  return (
    <div>
      <CreateCustomerStyle>
        <CreateCustomerForm>
          <h2>Create a new customer</h2>
          <label>Customer name</label>
          <Input
            type="text"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
            required
          />
          <label>Organisation number</label>
          <Input
            type="number"
            placeholder="[0,1,2]"
            value={customerOrgNr}
            onChange={(e) => setCustomerOrgNr(e.target.value)}
            required
          />
          <label>VatNr</label>
          <Input
            value={customerVatNr}
            placeholder="SE**********"
            onChange={(e) => setCustomerVatNr(e.target.value)}
            required
          />
          <label>Customer reference</label>
          <Input
            type="text"
            value={customerReference}
            onChange={(e) => setCustomerReference(e.target.value)}
            required
          />
          <label>Payment Term</label>
          <Input
            type="number"
            value={customerPaymentTerm}
            onChange={(e) => setCustomerPaymentTerm(e.target.value)}
            required
          />
          <label>Website</label>
          <Input
            type="text"
            value={customerWebsite}
            onChange={(e) => setCustomerWebsite(e.target.value)}
            required
          />
          <label>Email</label>
          <Input
            type="email"
            value={customerEmail}
            onChange={(e) => setCustomerEmail(e.target.value)}
            required
          />
          <label>Phone number</label>
          <Input
            type="number"
            value={customerPhoneNr}
            onChange={(e) => setCustomerPhoneNr(e.target.value)}
            required
          />
          <Button onClick={handleCreateCustomer}>Create customer</Button>
        </CreateCustomerForm>
      </CreateCustomerStyle>
    </div>
  );
}
