import React, { useEffect, useState } from "react";
import UserKit from "../data/UserKit";
import { useHistory } from "react-router-dom";

export default function CustomerDetail(props) {
  const [customerDetail, setCustomerDetail] = useState({});
  const userKit = new UserKit();
  const history = useHistory();
  //console.log("CustomerDetail started props: ", JSON.stringify(props));
  //console.log(props.match.params.slug);

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
  return (
    <div>
      <h1>Customer name: {customerDetail.name}</h1>
      <p>Organisation Number: {customerDetail.organisationNr}</p>
      <p>Vat Number: {customerDetail.vatNr}</p>
      <p>Reference: {customerDetail.reference}</p>
      <p>Payment Term: {customerDetail.paymentTerm}</p>
      <p>Website: {customerDetail.website}</p>
      <p>email: {customerDetail.email}</p>
      <p>Phone number: {customerDetail.phoneNumber}</p>
      <button onClick={handleDeleteCustomer}>Radera kund</button>
    </div>
  );
}
