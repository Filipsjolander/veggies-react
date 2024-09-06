import React, { useState } from "react";
import "./App.css";
import styled from "styled-components";

import { collection, addDoc, getDocs, Timestamp } from "firebase/firestore";
import { db } from "./firestoreConfig";
import image from "./nomio-runner.png";

const Heading = styled.h1`
  font-size: 5em;
  line-height: 0.9em;
  margin-bottom: 2rem;

  @media (max-width: 600px) {
    font-size: 2em;
    margin-bottom: 1.5rem;
  }
`;

const Fade = styled.div`
  position: absolute;
  width: 400px;
  height: 100%;
  right: -400px;
  background: linear-gradient(
    to right,
    rgba(2, 15, 15, 1) 35%,
    74%,
    rgba(1, 18, 15, 0)
  );
`;

const ColoredBackground = styled.div`
  position: relative;
  background: rgba(2, 15, 15, 1);
  display: flex;
  flex-grow: 1;
`;

const BackgroundContainer = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  flex-direction: row-reverse;
`;

const Image = styled.img`
  height: 100%;
  width: fit-content;
  user-select: none;
`;

const Page = styled.div`
  position: relative;
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;

  color: white;
  background: rgb(1, 18, 15);
`;

const SignUpButton = styled.button`
  border-top-right-radius: 8px;
  border-bottom-right-radius: 8px;
  border: transparent;
  padding: 8px;
  padding-right: 12px;
  color: #ffffffc9;
  background-color: transparent;
  cursor: pointer;
  &:hover {
    background-color: #ffffff11;
  }
`;

const StyledInput = styled.input`
  border-bottom-left-radius: 8px;
  border-top-left-radius: 8px;
  border: transparent;
  padding: 8px;
  color: #ffffff;
  background-color: transparent;
`;

const InputContainer = styled.div`
  width: fit-content;
  border: solid 1px white;
  border-radius: 8px;
  color: white;
  background-color: transparent;

  display: flex;
  flex-direction: row;
`;

const ScrollContainer = styled.div`
  z-index: 1;
  height: 100%;
  width: 100%;
  overflow: auto;
`;

const Content = styled.div`
  margin: 180px;
  max-width: 50ch;
  @media (max-width: 600px) {
    margin: 54px;
    margin-top: 96px;
    margin-left: 32px;
  }
`;

const Link = styled.a`
  color: white;
  text-underline-offset: 8px;
`;

const LinkContainer = styled.p`
  transition: 0.2s;
  background-color: rgba(255, 255, 255, 0);
  width: fit-content;
  &:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }
  padding-bottom: 4px;
`;

const Logo = styled.div`
  z-index: 1;
  position: absolute;
  left: 18px;
  top: 8px;
  color: rgb(250, 250, 250);
`;

function App() {
  console.log("hello", { db });
  const [email, setEmail] = useState("");
  const [hasSent, setHasSent] = useState(false);
  const addEmail = async (email: string) => {
    try {
      await addDoc(collection(db, "emails"), {
        email: email,
        addedAt: Timestamp.now(),
      });
      setHasSent(true);
      setEmail("");
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };
  return (
    <div className="App">
      <Page>
        <Logo>
          <h3>nomio</h3>
        </Logo>
        <ScrollContainer>
          <Content>
            <Heading>Launching soon.</Heading>

            <p>
              Get scientific with clinically tested isothiocyanates from{" "}
              <span role="img" aria-label="Broccoli">
                🥦
              </span>
              . Reduces lactic acid by 12% and increases endurance by 8% on
              average during exercise. Promotes quicker recovery of muscles
              post-exercise, for your volume training.
            </p>
            <p>And it works.</p>
            <InputContainer>
              <StyledInput
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder={hasSent ? "Thank you!" : "Your email"}
              />
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
                Sign up for early access
              </SignUpButton>
            </InputContainer>
            <LinkContainer>
              <Link href={"https://pubmed.ncbi.nlm.nih.gov/37688976/"}>
                Dig into the science here.
              </Link>
            </LinkContainer>
          </Content>
        </ScrollContainer>
        <BackgroundContainer>
          <Image src={image} />
          <ColoredBackground>
            <Fade />
          </ColoredBackground>
        </BackgroundContainer>
      </Page>
    </div>
  );
}

export default App;
