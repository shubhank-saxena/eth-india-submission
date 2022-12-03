import Head from "next/head";
import Image from "next/image";
import React from "react";
import {
  RiArrowRightLine,
  RiImageAddLine,
  RiTwitterLine,
} from "react-icons/ri";
import { MdOutlineContentCopy } from "react-icons/md";
import { CgCheckR } from "react-icons/cg";
import { FiLink2 } from "react-icons/fi";
import styled from "styled-components";
import { CustomConnectButton } from "../../components/CustomConnectButton";
import LinkCard from "../../components/LinkCard";
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";
import Dropdown from "../../components/Dropdown";
import DropdownSimple from "../../components/DropdownSimple";

const permissionOptions = [
  {
    value: "viewer",
    label: "Viewer",
  },
  {
    value: "editor",
    label: "Editor",
  },
];
const InviteTeammates = () => {
  const copyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setLinkCopied(true);
    setTimeout(() => {
      setLinkCopied(false);
    }, 2000);
  };
  const [linkCopied, setLinkCopied] = React.useState(false);
  return (
    <>
      <Head>
        <title>Segmentation-Signup</title>
        <meta name="description" content="Segmentation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentContainer>
        <MainContainer>
          <StyledHeaderContainer>
            <div>
              <Title>Invite your team</Title>
              <Description>
                Give your teammates access to this project.
              </Description>
            </div>
            <div>
              <Subtitle></Subtitle>
              <Description></Description>
            </div>
          </StyledHeaderContainer>
          <StyledBodyContainer>
            <StyledBodyChildContainer>
              <EmailInputContainer>
                <StyledInput placeholder="team@email.com" />
                <DropdownSimple
                  // label="Role"
                  onChange={() => {}}
                  options={permissionOptions}
                  search={false}
                />
              </EmailInputContainer>
              <StyledButtonSecondary>Send invite</StyledButtonSecondary>
            </StyledBodyChildContainer>
            <StyledBodyChildContainer
              style={{
                alignItems: "center",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  flex: 1,
                  color: "#AEB1B3",
                  gap: "16px",
                }}
              >
                <FiLink2 size={24} />
                Anyone with the link
                <DropdownSimple
                  // label="Role"
                  onChange={() => {}}
                  options={permissionOptions}
                  search={false}
                />
              </div>
              <CopyButton
                onClick={() => {
                  !linkCopied && copyLink();
                }}
                linkCopied={linkCopied}
              >
                {linkCopied ? (
                  <>
                    <CgCheckR />
                    Copied!
                  </>
                ) : (
                  <>
                    <MdOutlineContentCopy />
                    Copy Link
                  </>
                )}
              </CopyButton>
            </StyledBodyChildContainer>
          </StyledBodyContainer>
          <StyledButtonContainer>
            <StyledButtonPrimary>
              Sign up <RiArrowRightLine size={20} />
            </StyledButtonPrimary>
          </StyledButtonContainer>
        </MainContainer>
      </ContentContainer>
    </>
  );
};
const CopyButton = styled.button<{ linkCopied: boolean }>`
  background-color: transparent;
  border: none;
  display: flex;
  flex-direction: row;
  align-items: center;
  padding: 0px;
  gap: 8px;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.01em;
  color: ${(props) => (props.linkCopied ? "#10B981" : "#AEB1B3")};
  cursor: pointer;
`;
const EmailInputContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex: 1;
  border: 1px solid #33383f;
  border-radius: 12px;
  :focus-within {
    border: 1px solid #6366f1;
    background: rgba(17, 19, 21, 0.5);
  }
`;
const Title = styled.h1`
  font-weight: 400;
  font-size: 22px;
  line-height: 32px;
`;
const Description = styled.p`
  font-weight: 400;
  font-size: 13px;
  color: #71717a;
`;
const StyledBodyContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 24px;
`;
const StyledBodyChildContainer = styled.div`
  display: flex;
  gap: 12px;
  align-items: flex-end;
`;
const Subtitle = styled.h2`
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #d4d4d8;
`;
const StyledDropdown = styled(Dropdown)`
  border: none;
`;
const GridChild1 = styled.div`
  grid-column: span 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const GridChild2 = styled.div`
  grid-column: span 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const GridChild3 = styled.div`
  grid-column: span 3;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #f5f5f5;
  height: 100%;
  background: #1a1d1f;
`;
const StageContainer = styled.div`
  width: 456px;
  /* border: 1px solid #f5f5f5; */
  padding: 40px;
`;
const MainContainer = styled.div`
  width: 648px;
  background: #1a1d1f;
  /* shadow/md */

  box-shadow: 0px 10px 15px -3px rgba(0, 0, 0, 0.14),
    0px 4px 6px -2px rgba(0, 0, 0, 0.09);
  border-radius: 24px;
  height: 100%;

  /* min-height: 820px; */
  padding: 32px 24px;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  gap: 20px;
`;
const LogoContainer = styled.div`
  display: flex;
  justify-content: center;
  margin-bottom: 32px;
`;
const StyledGridContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  column-gap: 24px;
  row-gap: 24px;
  grid-template-rows: 80px;
`;
const StyledHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 12px;
  border: none;
  /* border: 1px solid #52525b; */
  border-radius: 8px;
  background-color: transparent;
  font-weight: 400;
  font-size: 13px;
  /* line-height: 20px; */
  /* BaseColors/Charcoal Grey/900 */
  color: #f5f5f5;
  :focus {
    /* border: 1px solid #8383ff; */
    outline: none;
  }
  ::placeholder {
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    /* BaseColors/Charcoal Grey/400 */
    color: #52525b;
  }
`;

// const StyledRadioButton = styled.div`
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   width: 20px;
//   height: 20px;
//   border-radius: 100%;
//   border: 2px solid ${(props) => (props.isActive ? "#a2a2ff" : "#71717A")};
//   ::after {
//     content: "";
//     display: ${(props) => (props.isActive ? "block" : "none")};
//     width: 10px;
//     height: 10px;
//     border-radius: 100%;
//     background: ${(props) => (props.isActive ? "#a2a2ff" : "#71717A")};
//   }
// `;
const StyledTextArea = styled.textarea`
  height: 120px;
  padding: 18px;
  border: 1px solid #52525b;
  border-radius: 8px;
  background-color: transparent;
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  /* BaseColors/Charcoal Grey/900 */
  color: #f5f5f5;
  :focus {
    border: 1px solid #8383ff;
  }
  ::placeholder {
    font-weight: 400;
    font-size: 13px;
    line-height: 20px;
    /* BaseColors/Charcoal Grey/400 */
    color: #52525b;
  }
`;
// const StyledLinkIcons = styled.a<StyledLinksProps>`
//   width: 48px;
//   height: 48px;
//   padding: 12px;
//   display: flex;
//   align-items: center;
//   justify-content: center;
//   /* BaseColors/Charcoal Grey/400 */
//   border: 1px solid #52525b;
//   border-radius: 8px;
//   svg {
//     width: 24px;
//     height: 24px;
//     color: ${(props) => (props.isActive ? "#8383FF" : "#71717A")};
//   }
// `;
const StyledButtonPrimary = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 8px;
  /* width: 100%; */
  background: ${(props) => (props.disabled ? "#3F3F46" : "#a2a2ff")};
  border-radius: 100px;
  border: none;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0.1px;
  color: ${(props) => (props.disabled ? "#71717A" : "#1c119b")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
const StyledButtonSecondary = styled.button`
  display: flex;
  /* height: 50px; */
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 8px;
  background: ${(props) => (props.disabled ? "#3F3F46" : "#6366F1")};
  border-radius: 12px;
  border: none;
  font-weight: 500;
  font-size: 16px;
  line-height: 24px;
  letter-spacing: 0.1px;
  color: ${(props) => (props.disabled ? "#71717A" : "#fff")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
const StyledProfilePictureCard = styled.div`
  grid-row: span 2;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 16px;
  border: 1px solid #52525b;
  border-radius: 8px;
  aspect-ratio: 1/1;
  /* height: 180px; */
  color: #71717a;
  position: relative;
  overflow: hidden;
  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    position: absolute;
    z-index: 1500;
    border-radius: 8px;
    top: 0;
    left: 0;
  }
`;
const UserName = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const StyledLabelContainer = styled.div<{ isActive: boolean | null }>`
  display: flex;
  align-items: center;
  gap: 8px;
  font-weight: 400;
  font-size: 11px;
  line-height: 16px;
  /* BaseColors/Charcoal Grey/700 */
  color: #d4d4d8;
  color: ${(props) => (props.isActive ? "#d4d4d8" : "#A1A1AA")};
`;
const UserRole = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const Chain = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const UserBio = styled.div`
  grid-column: span 3;
  grid-row: span 2;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const UserEmail = styled.div`
  grid-column: span 2;
  grid-row: span 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const ProjectLinks = styled.div`
  grid-column: span 2;
  grid-row: span 1;
  display: flex;
  flex-direction: column;
  gap: 8px;
`;
const UserWallet = styled.div`
  grid-column: span 1;
  grid-row: span 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 8px;
`;

const StyledLinksContainer = styled.div`
  display: flex;
  gap: 16px;
`;
const StyledButtonContainer = styled.div`
  width: 100%;
  margin-top: auto;
  display: flex;
  justify-content: end;
`;
const StyledConnectWalletButton = styled(StyledButtonSecondary)`
  width: 160px;
`;
const StyledProfilePictureContainer = styled.input`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  padding: 16px;
  opacity: 0;
  background-color: #3f3f46;
  position: absolute;
  top: 0;
  left: 0;
  overflow: hidden;
  cursor: pointer;
`;
export default InviteTeammates;
