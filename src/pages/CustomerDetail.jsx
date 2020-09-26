import React, { useEffect, useState, useContext } from "react";
import { UserContext } from "../contexts/UserContext";
import UserKit from "../data/UserKit";
import Header from "../components/Header";
import { useHistory } from "react-router-dom";
import styled from "styled-components";

export default function CustomerDetail(props) {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  const [customerDetail, setCustomerDetail] = useState({});

  const userKit = new UserKit();
  const history = useHistory();
  //console.log("CustomerDetail started props: ", JSON.stringify(props));
  //console.log(props.match.params.slug);

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
    getCustomerDetail();
  }, []);

  function getCustomerDetail() {
    console.log("getCustomerDetail started");
    const currentSlug = props.match.params.slug;
    userKit
      .getCustomerDetail(currentSlug)
      .then((res) => res.json())
      .then((data) => {
        setCustomerDetail(data);
        console.log("Customer data: ", data);
      });
  }

  function handleDeleteCustomer() {
    userKit.deleteCustomer(customerDetail.id).then((data) => {});
    history.push("/home");
  }

  const Button = styled.button`
    background-color: peachpuff;
    font-size: 1em;
    font-weight: 600;
    margin: 1em;
    padding: 0.25em 1em;
    border: 2px solid black;
    border-radius: 3px;
  `;

  return (
    <div>
      <Header />
      <hr />
      <p>Customer name: {customerDetail.name}</p>
      <p>Organisation Number: {customerDetail.organisationNr}</p>
      <p>Vat Number: {customerDetail.vatNr}</p>
      <p>Reference: {customerDetail.reference}</p>
      <p>Payment Term: {customerDetail.paymentTerm}</p>
      <p>Website: {customerDetail.website}</p>
      <p>email: {customerDetail.email}</p>
      <p>Phone number: {customerDetail.phoneNumber}</p>

      <Button onClick={handleDeleteCustomer}>Remove customer</Button>
    </div>
  );
}
