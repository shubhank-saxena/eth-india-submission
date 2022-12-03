import React from "react";
import Lottie from "react-lottie-player";
import styled from "styled-components";
import loader from "../../public/images/assets/loader.json";
const LargeLoader = () => {
  return (
    <Container>
      <Lottie
        loop
        animationData={loader}
        play
        style={{ width: 150, height: 150 }}
      />
    </Container>
  );
};
const Container = styled.div`
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  top: 0;
  left: 0;
  background: rgba(0, 0, 0, 0.5);
  z-index: 100000;
`;
export default LargeLoader;
