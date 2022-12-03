import React from "react";
import { RiSettings2Line, RiUserAddLine } from "react-icons/ri";
import styled from "styled-components";
import InviteTeammates from "../../src/modules/project/InviteTeammates";
import ProjectDetails from "../../src/modules/project/ProjectDetails";

const Onboarding = () => {
  return (
    <Container>
      <ContentContainer>
        <Left>
          <Header>
            <img src="/images/logos/mainLogo.svg" alt="" />
            <Subtitle>
              You&apos;ve been invited to experience Wall. Track,
              <br /> incentivize & engage with your community.
            </Subtitle>
          </Header>
          <CardContainer>
            <Card active={true}>
              <CardIconContainer active={true}>
                <RiSettings2Line />
              </CardIconContainer>
              <CardTextContainer>
                <CardTitle active={true}>Setup Project</CardTitle>
                <CardSubtitle active={true}>
                  Tell us about your project
                </CardSubtitle>
              </CardTextContainer>
            </Card>
            <Card active={false}>
              <CardIconContainer>
                <RiUserAddLine />
              </CardIconContainer>
              <CardTextContainer>
                <CardTitle>Invite Teammates</CardTitle>
                <CardSubtitle>invite your team members to WALL</CardSubtitle>
              </CardTextContainer>
            </Card>
          </CardContainer>
          <ProgressContainer>
            <ProgressBar active={true} />
            <ProgressBar active={false} />
          </ProgressContainer>
        </Left>
        <Right>
          <ProjectDetails />
          {/* <InviteTeammates /> */}
        </Right>
      </ContentContainer>
    </Container>
  );
};

export default Onboarding;
const Container = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  width: 100vw;
  height: 100vh;
`;
const ContentContainer = styled.div`
  max-height: 750px;
  height: 100%;
  width: 100%;
  max-width: 1100px;
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;
const Left = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
  padding: 32px 40px;
`;
const Right = styled.div`
  height: 100%;
  display: flex;
  flex-direction: column;
`;
const Header = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  gap: 24px;
`;
const Subtitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  text-align: center;
  letter-spacing: 0.01em;
  color: #a1a1aa;
`;
const CardContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const ProgressContainer = styled.div`
  display: flex;
  flex-direction: row;
  gap: 8px;
`;
const Card = styled.div<{ active?: boolean }>`
  background: ${(props) => (props.active ? "#1a1d1f" : "transparent")};
  border: ${(props) =>
    props.active ? "1px solid #6366f1" : "1px solid #272B30"};
  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.14),
    0px 4px 6px -2px rgba(0, 0, 0, 0.09);
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  gap: 32px;
  padding: 16px;
`;
const CardIconContainer = styled.div<{ active?: boolean }>`
  svg {
    font-size: 32px;
    color: ${(props) => (props.active ? "#6366f1" : "#AEB1B3")};
  }
`;

const CardTextContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const CardTitle = styled.h2<{ active?: boolean }>`
  font-weight: 600;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: ${(props) => (props.active ? "#e6e6e6" : "#AEB1B3")};
`;
const CardSubtitle = styled.h3<{ active?: boolean }>`
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: ${(props) => (props.active ? "#aeb1b3" : "#6F767E")};
`;
const ProgressBar = styled.div<{ active: boolean }>`
  /* background: #6366f1; */
  background: ${(props) => (props.active ? "#6366f1" : "#272B30")};
  border-radius: 4px;
  height: 4px;
  flex: 1;
`;
