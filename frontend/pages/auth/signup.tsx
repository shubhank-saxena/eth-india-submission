import styled from "styled-components";
import {
  RiArrowRightLine,
  RiImageAddLine,
  RiTwitterLine,
} from "react-icons/ri";

import Image from "next/image";
import { useEffect, useState } from "react";

import axios from "axios";

import { API_URL } from "../../constants";
import { CustomConnectButton } from "../../src/components/CustomConnectButton";
import { useRouter } from "next/router";
import Head from "next/head";
import LinkCard from "../../src/components/LinkCard";
import { FaDiscord, FaTelegramPlane } from "react-icons/fa";

interface StyledLinksProps {
  readonly isActive: boolean;
}
interface isUserInfo {
  display_name?: string;
  invite_code?: string;
  email_address?: string;
  profile_pic_link?: string;
  description?: string;
  twitter_username?: string;
  twitter_display_name?: string;
  discord_username?: string;
  telegram_username?: string;
}

const Signup = () => {
  const [userInfo, setUserInfo] = useState<isUserInfo>();
  const [isFormComplete, setIsFormComplete] = useState<boolean>(false);
  const discordAuthUrl =
    "https://discord.com/api/oauth2/authorize?client_id=1047129337746436126&redirect_uri=https%3A%2F%2Fsegmentation.wall.app%2Fauth%2Fsignup&response_type=code&scope=identify%20email%20guilds%20guilds.members.read";

  const router = useRouter();

  const handleTwitterAuth = async () => {
    const res = await axios.get(
      `${API_URL}/userprofile/generate-twitter-token`,
      {
        headers: {
          Authorization: `Bearer ${localStorage.getItem("access_token")}`,
        },
      }
    );
    console.log(res.data);
  };

  const handleDiscordAuth = async (code: string) => {
    try {
      if (code) {
        const res = await axios.post(
          `${API_URL}/userprofile/generate-discord-token`,
          {
            code: code,
          },
          {
            headers: {
              Authorization: `Bearer ${localStorage.getItem("access_token")}`,
            },
          }
        );
        console.log(res.data);
        setUserInfo({
          ...(userInfo || {}),
          discord_username: res.data.data.discord_username,
        });
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleImageUpload = (e: any) => {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = async () => {
      console.log(reader.result);
      const res = await axios.post(
        `${API_URL}/userprofile/upload-pic`,
        {
          profile_pic: reader.result,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      console.log(res);
      setUserInfo({ ...userInfo, profile_pic_link: res.data.data.profile_pic });
    };
  };

  const updateUserProfile = async () => {
    try {
      const res = await axios.post(
        `${API_URL}/userprofile/update`,
        { ...userInfo, new_user: false },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("access_token")}`,
          },
        }
      );
      router.push("/persona");
    } catch (err) {
      console.log(err);
    }
  };

  //effect to set local storage on userInfo change
  useEffect(() => {
    if (userInfo && Object.keys(userInfo).length !== 0) {
      console.log("userInfo", userInfo);
      localStorage.setItem("user_info", JSON.stringify(userInfo));
    }
  }, [userInfo]);

  //effect to check if form is complete
  useEffect(() => {
    const checkFormComplete = () => {
      console.log("check called");
      setIsFormComplete(true);
      userInfo &&
        Object.keys(userInfo).map((key) => {
          if (userInfo[key as keyof isUserInfo] === "") {
            console.log("empty", key);
            setIsFormComplete(false);
          }
          // console.log(key, userInfo[key]);
        });
    };
    checkFormComplete();
  }, [userInfo]);

  //effect to fetch user info from local storage
  useEffect(() => {
    const localUserInfo = localStorage.getItem("user_info");
    if (localUserInfo) {
      const parsedUserInfo: isUserInfo = JSON.parse(localUserInfo || "{}");
      setUserInfo(parsedUserInfo);
    }
  }, [router]);

  //effect to fetch query params
  useEffect(() => {
    const params = router.query;
    console.log("params", params);
    if (params.code && typeof params.code === "string")
      handleDiscordAuth(params?.code);
  }, [router]);

  //effect to fetch user info from backend
  useEffect(() => {});
  useEffect(() => {
    console.log("isFormComplete", isFormComplete);
  }, [isFormComplete]);

  return (
    <Container>
      <Head>
        <title>Segmentation-Signup</title>
        <meta name="description" content="Segmentation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <ContentContainer>
        <LogoContainer>
          <Image
            src="/images/logos/mainLogo.svg"
            alt="Wall Logo"
            width={100}
            height={100}
          />
        </LogoContainer>

        <MainContainer>
          <StyledHeaderContainer>
            <div>
              <Title>Sign up</Title>
              <Description>Tell your community about you</Description>
            </div>
            <div>
              <Subtitle></Subtitle>
              <Description></Description>
            </div>
          </StyledHeaderContainer>
          <StyledGridContainer>
            <StyledProfilePictureCard>
              <StyledProfilePictureContainer
                type={"file"}
                accept="image/*"
                onChange={handleImageUpload}
              />
              {userInfo?.profile_pic_link && (
                <img
                  src={userInfo?.profile_pic_link}
                  alt="Wall Logo"
                  width={100}
                  height={100}
                />
              )}
              <span></span>
              <RiImageAddLine size={24} />
              <span>Add profile picture</span>
            </StyledProfilePictureCard>
            <UserWallet>
              <StyledLabelContainer isActive={false}>
                Connect your wallet
              </StyledLabelContainer>
              <CustomConnectButton></CustomConnectButton>
              {/* <StyledConnectWalletButton>
                Connect wallet
              </StyledConnectWalletButton> */}
            </UserWallet>
            <UserName>
              <StyledLabelContainer isActive={false}>Name</StyledLabelContainer>
              <StyledInput
                placeholder="eg. Funny frogs"
                defaultValue={userInfo?.display_name}
                onChange={(e) =>
                  setUserInfo({
                    ...(userInfo || {}),
                    display_name: e.target.value,
                  })
                }
              />
            </UserName>
            <UserName>
              <StyledLabelContainer isActive={false}>
                Invite code
              </StyledLabelContainer>
              <StyledInput
                placeholder="eg. Funny frogs"
                defaultValue={userInfo?.invite_code}
                onChange={(e) =>
                  setUserInfo({
                    ...(userInfo || {}),
                    invite_code: e.target.value,
                  })
                }
              />
            </UserName>
            {/* <UserRole>
              <StyledLabelContainer isActive={false}>Role</StyledLabelContainer>
              <StyledDropdown>
                Admin
                <RiArrowDropDownLine size={24} />
              </StyledDropdown>
            </UserRole> */}
            <UserEmail>
              <StyledLabelContainer isActive={false}>
                Email
              </StyledLabelContainer>
              <StyledInput
                type="email"
                defaultValue={userInfo?.email_address}
                onChange={(e) =>
                  setUserInfo({
                    ...(userInfo || {}),
                    email_address: e.target.value,
                  })
                }
              />
            </UserEmail>
            <UserBio>
              <StyledLabelContainer isActive={false}>Bio</StyledLabelContainer>
              <StyledTextArea
                placeholder="Some lines about you..."
                defaultValue={userInfo?.description}
                onChange={(e) =>
                  setUserInfo({
                    ...(userInfo || {}),
                    description: e.target.value,
                  })
                }
              />
            </UserBio>
            <ProjectLinks>
              <StyledLabelContainer isActive={false}>
                Add links
              </StyledLabelContainer>
              <StyledLinksContainer>
                <LinkCard
                  placeholder="https://twitter.com/..."
                  buttonText="Add twitter"
                  variant="auth"
                  onClick={handleTwitterAuth}
                  isActive={userInfo?.twitter_username ? true : false}
                >
                  <RiTwitterLine size={24} />
                </LinkCard>
                <LinkCard
                  placeholder="https://discord.com/..."
                  buttonText="Add discord"
                  variant="auth"
                  onClick={() => {
                    window.open(discordAuthUrl, "_self");
                  }}
                  isActive={userInfo?.discord_username ? true : false}
                >
                  <FaDiscord />
                </LinkCard>
                {/* <LinkCard
                  placeholder="https://telegram.com/..."
                  buttonText="Add telegram"
                  onClick={() => {
                    console.log("clicked");
                  }}
                >
                  <FaTelegramPlane />
                </LinkCard> */}
              </StyledLinksContainer>
            </ProjectLinks>
          </StyledGridContainer>
          <StyledButtonContainer>
            <StyledButtonPrimary
              onClick={updateUserProfile}
              disabled={!isFormComplete}
            >
              Sign up <RiArrowRightLine size={20} />
            </StyledButtonPrimary>
          </StyledButtonContainer>
        </MainContainer>
      </ContentContainer>
    </Container>
  );
};

const Container = styled.div`
  /* padding: 102px 156px; */
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
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
const Subtitle = styled.h2`
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #d4d4d8;
`;
const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  color: #f5f5f5;
`;
const StageContainer = styled.div`
  width: 456px;
  /* border: 1px solid #f5f5f5; */
  padding: 40px;
`;
const MainContainer = styled.div`
  width: 648px;
  background: #27272a;
  min-height: 820px;
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
  grid-template-columns: 1fr 1fr;
  column-gap: 24px;
  row-gap: 24px;
  grid-template-rows: 80px;
`;
const StyledHeaderContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;
// const SubHeading = styled.h2`
//   font-weight: 400;
//   font-size: 15px;
//   line-height: 150%;
//   color: #a1a1aa;
//   margin-top: 24px;
//   text-align: center;
// `;
// const StyledStageContainer = styled.div`
//   display: flex;
//   flex-direction: column;
//   margin-top: 100px;
//   gap: 24px;
// `;
// const StyledStageCard = styled.div<StyledLinksProps>`
//   display: flex;
//   flex-direction: column;
//   align-items: flex-start;
//   padding: 16px;
//   gap: 32px;
//   width: 375px;
//   height: 142px;
//   /* BaseColors/Charcoal Grey/200 */
//   background: ${(props) => (props.isActive ? "#27272a" : "transparent")};
//   /* BaseColors/Royal Blue/400 */
//   border: ${(props) =>
//     props.isActive ? "1px solid #a2a2ff" : "1px solid #52525b"};
//   border-radius: 8px;
// `;

// const StyledStageCardIcon = styled.div`
//   svg {
//     color: ${(props) => (props.isActive ? "#a2a2ff" : "#71717A")};
//   }
// `;
// const StyledStageCardText = styled.div``;
// const StyledStageCardTitle = styled.div`
//   font-weight: 500;
//   font-size: 15px;
//   line-height: 24px;
//   /* identical to box height, or 160% */
//   /* BaseColors/Charcoal Grey/900 */
//   color: ${(props) => (props.isActive ? "#f5f5f5" : "#71717A")};
// `;
// const StyledStageCardSubtitle = styled.div`
//   font-weight: 400;
//   font-size: 13px;
//   line-height: 26px;
//   /* identical to box height, or 200% */
//   /* BaseColors/Charcoal Grey/600 */
//   color: ${(props) => (props.isActive ? "#a1a1aa" : "#52525B")};
// `;
// const StyledProgressContainer = styled.div`
//   display: flex;
//   gap: 16px;
//   margin-top: 100px;
// `;
// const StyledProgressBar = styled.div`
//   width: 114.33px;
//   height: 4px;
//   /* BaseColors/Royal Blue/500 */
//   background: ${(props) => (props.isActive ? "#a2a2ff" : "#27272A")};
//   border-radius: 4px;
// `;
const StyledInput = styled.input`
  width: 100%;
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
const StyledLinkIcons = styled.a<StyledLinksProps>`
  width: 48px;
  height: 48px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* BaseColors/Charcoal Grey/400 */
  border: 1px solid #52525b;
  border-radius: 8px;
  svg {
    width: 24px;
    height: 24px;
    color: ${(props) => (props.isActive ? "#8383FF" : "#71717A")};
  }
`;
const StyledButtonPrimary = styled.button<{ disabled: boolean }>`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 8px;
  background: ${(props) => (props.disabled ? "#3F3F46" : "#a2a2ff")};
  border-radius: 100px;
  border: none;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0.1px;
  /* BaseColors/Royal Blue/900 */
  color: ${(props) => (props.disabled ? "#71717A" : "#1c119b")};

  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
  svg {
    /* stroke-width: 1.1px; */
  }
`;
const StyledButtonSecondary = styled.button`
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 8px;
  border: ${(props) =>
    props.disabled ? "1px solid #3F3F46" : "1px solid #a2a2ff"};
  background-color: transparent;
  border-radius: 100px;

  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0.1px;
  /* BaseColors/Royal Blue/900 */
  color: ${(props) => (props.disabled ? "#71717A" : "#a2a2ff")};

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
  height: 180px;
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
  grid-column: span 2;
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
  grid-row: span 2;
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
export default Signup;
