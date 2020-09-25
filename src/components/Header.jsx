import React, { useContext } from "react";
import { UserContext } from "../contexts/UserContext";

import styled from "styled-components";

const Container = styled.div`
  text-align: center;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export default function Header() {
  const { loggedInUser } = useContext(UserContext);
  console.log("Loggedinuser", loggedInUser);

  return (
    <Container>
      <div>Inloggad: {loggedInUser.name}</div>
      <div>Meny</div>
    </Container>
  );
}
