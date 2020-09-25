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
const userKit = new UserKit();

export default function Header() {
  const { loggedInUser, setLoggedInUser } = useContext(UserContext);
  console.log("Loggedinuser", loggedInUser);

  let name = "";
  if (loggedInUser) {
    name = `${loggedInUser.firstName} ${loggedInUser.lastName}`;
  }

  return (
    <Container>
      <div>Inloggad: {name}</div>
      <div>Meny</div>
    </Container>
  );
}
