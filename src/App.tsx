import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";

import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "./firestoreConfig";

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
  console.log("hello", { db });
  const [email, setEmail] = useState("");
  const addEmail = async (email: string) => {
    try {
      const docRef = await addDoc(collection(db, "emails"), {
        email: email,
        addedAt: Timestamp.now(),
      });
      console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="App">
      <header className="App-header">
        <Heading>nomio</Heading>
        <p>the website will launch soon...</p>
        <input value={email} onChange={(e) => setEmail(e.target.value)} />
        <SignUpButton
          onClick={async () => {
            await addEmail(email);
            console.log("trying to read");
            const querySnapshot = await getDocs(collection(db, "emails"));
            querySnapshot.forEach((doc) => {
              console.log(`${doc.id} => ${doc.data()}`);
            });
          }}
        >
          Sign up here
        </SignUpButton>
      </header>
    </div>
  );
}

export default App;
