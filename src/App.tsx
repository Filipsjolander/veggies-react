import React from "react";
import "./App.css";
import styled from "styled-components";

const Heading = styled.h1``;

const SignUpButton = styled.button`
  border: solid 1px white;
  border-radius: 8px;
  padding: 8px;
  color: white;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: #ffffff11;
  }
`;

function App() {
  return (
    <div className="App">
      <header className="App-header">
        <Heading>Veggies</Heading>
        <p>The website will launch soon...</p>
        <SignUpButton
          onClick={() => {
            alert("not implemented");
          }}
        >
          Sign up here
        </SignUpButton>
      </header>
    </div>
  );
}

export default App;
