import React, { useState } from "react";
import UserKit from "../data/UserKit";
import styled from "styled-components";

const Button = styled.button`
  background-color: peachpuff;
  font-size: 1em;
  font-weight: 600;
  margin: 1em;
  padding: 0.25em 1em;
  border: 2px solid black;
  border-radius: 3px;
`;

const RegistrationText = styled.p`
  color: #fd00009e;
`;

const RegistrationWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export default function Registration() {
  //registration
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [organisationName, setOrganisationName] = useState("");
  const [organisationKind, setOrganisationKind] = useState("");

  const userKit = new UserKit();

  function handleRegister() {
    console.log("handleRegister started");
    userKit.register(
      firstName,
      lastName,
      email,
      password,
      organisationName,
      organisationKind
    );
  }

  return (
    <RegistrationWrapper>
      <h2>Register</h2>
      <p>Enter details to register</p>

      <input
        placeholder="First Name"
        value={firstName}
        onChange={(e) => setFirstName(e.target.value)}
      />
      <input
        placeholder="Last Name"
        value={lastName}
        onChange={(e) => setLastName(e.target.value)}
      />
      <input
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <input
        placeholder="Organisation Name"
        value={organisationName}
        onChange={(e) => setOrganisationName(e.target.value)}
      />
      <input
        placeholder="Organisation Kind (0,1,2)"
        value={organisationKind}
        onChange={(e) => setOrganisationKind(e.target.value)}
      />
      <Button onClick={handleRegister}>Register</Button>
      <RegistrationText>
        Please activate account after registration by using link in your email
      </RegistrationText>
    </RegistrationWrapper>
  );
}
