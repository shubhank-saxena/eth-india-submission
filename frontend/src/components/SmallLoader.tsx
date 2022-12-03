import React from "react";
import Lottie from "react-lottie-player";
import styled from "styled-components";
import loader from "../../public/images/assets/loader.json";
const SmallLoader = () => {
  return (
    <Container>
      <Lottie
        loop
        animationData={loader}
        play
        style={{ width: 25, height: 25 }}
      />
    </Container>
  );
};
const Container = styled.div`
  width: 100%;
  height: 50px;
  display: flex;
  justify-content: center;
  align-items: center;
  /* position: absolute;
  top: 0;
  z-index: 100000;
  left: 0; */
  /* background: rgba(0, 0, 0, 0.5); */
`;
export default SmallLoader;
