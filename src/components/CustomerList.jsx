import React, { useState, useEffect, useContext } from "react";
import UserKit from "../data/UserKit";
import Header from "./Header";

import { Link } from "react-router-dom";
import styled from "styled-components";

const CustomerNameStyling = styled.div`
  margin-top: 2rem;
  text-decoration: none;
  color: black;
  a:hover {
    color: lightsalmon;
    text-decoration: none;
  }
`;

const SmallerCustomerText = styled.p`
  font-size: 12px;
`;

export default function CustomerList({ customerList }) {
  return (
    <div>
      <Header />
      <hr />
      <h2>All customers</h2>

      {customerList &&
        customerList.map((customerItem) => {
          return (
            <div key={customerItem.id}>
              <CustomerNameStyling>
                <Link to={`/customers/${customerItem.id}`}>
                  <p> {customerItem.name}</p>
                  <SmallerCustomerText>
                    Org Number: {customerItem.organisationNr}
                  </SmallerCustomerText>
                  <SmallerCustomerText>
                    Reference: {customerItem.reference}
                  </SmallerCustomerText>
                </Link>
              </CustomerNameStyling>
            </div>
          );
        })}
    </div>
  );
}
