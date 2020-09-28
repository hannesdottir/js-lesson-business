import React, { useContext, useEffect } from "react";
import { UserContext } from "../contexts/UserContext";
import UserKit from "../data/UserKit";
import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

const LoggedInUserEmailStyle = styled.p`
  font-size: 12px;
`;
const userKit = new UserKit();

export default function Header() {
  const { loggedInUser } = useContext(UserContext);

  console.log("Loggedinuser", loggedInUser);

  let name = "";
  let email = "";
  if (loggedInUser) {
    name = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
    email = `${loggedInUser.email}`;
  }

  return (
    <Container>
      <div>
        <p>Inloggad: {name}</p>
        <LoggedInUserEmailStyle> {email}</LoggedInUserEmailStyle>
      </div>
    </Container>
  );
}
