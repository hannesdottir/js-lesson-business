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
  font-size: 14px;
`;

const RegistrationWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 4rem;
  align-self: center;
`;

const Input = styled.input`
  margin-bottom: 1rem;
  height: 20px;
  border: solid 1px black;
`;

const RegisterHeading = styled.div`
  text-align: center;
`;

const RegisterForm = styled.form`
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
    <div>
      <RegistrationWrapper>
        <RegisterForm>
          <RegisterHeading>
            <h2>Register</h2>
            <p>Enter details to register</p>
          </RegisterHeading>

          <label>First Name</label>
          <Input
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <label>Last Name</label>
          <Input
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />

          <label>Email</label>
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />

          <label>Password</label>
          <Input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />

          <label>Organisation name</label>
          <Input
            value={organisationName}
            onChange={(e) => setOrganisationName(e.target.value)}
            required
          />
          <label>Organisation kind</label>
          <Input
            placeholder="(0,1,2)"
            value={organisationKind}
            onChange={(e) => setOrganisationKind(e.target.value)}
            required
          />

          <Button onClick={handleRegister}>Register</Button>
        </RegisterForm>
        <RegistrationText>
          Please activate account after registration by using link in your email
        </RegistrationText>
      </RegistrationWrapper>
    </div>
  );
}
