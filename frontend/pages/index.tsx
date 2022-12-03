import axios from "axios";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import styled from "styled-components";
import { useAccount, useSignMessage } from "wagmi";
import { API_URL } from "../constants";
import LargeLoader from "../src/components/LargeLoader";

import { CustomConnectButton } from "../src/components/CustomConnectButton";

import {
  getNonce,
  verifyAccessToken,
  verifySignature,
} from "../src/utils/auth";
import { calculateFilterCount } from "../src/utils/persona";

const Home: NextPage = () => {
  const { address, isConnected } = useAccount();
  const router = useRouter();
  const [showLoader, setShowLoader] = useState(false);
  const [showSignToast, setShowSignToast] = useState(false);
  const [showOnboardingToast, setShowOnboardingToast] = useState(false);
  const [showCreatePersona, setShowCreatePersona] = useState(false);
  const [allPersonas, setAllPersonas] = useState([]);
  const [userData, setUserData] = useState({});
  const delay = (ms: number) => new Promise((res) => setTimeout(res, ms));
  const { data, error, isLoading, signMessage } = useSignMessage({
    onSuccess: async (signature) => {
      setShowSignToast(false);
      if (address) {
        const userAuthenticated = await verifySignature(address, signature);
        if (userAuthenticated) {
          setShowCreatePersona(true);
        }
      }
    },
    onError: (error) => {
      console.log("error sign", error.message);
      toast.error("Error signing message");
      setShowSignToast(true);
    },
  });
  const getNonceAndSign = async () => {
    if (address) {
      const nonce = await getNonce(address);
      await delay(1000);
      signMessage({
        message: nonce,
      });
    }
  };
  useEffect(() => {
    const authenticateUser = async () => {
      const accessToken = localStorage.getItem("access_token");
      console.log("accessToken", accessToken);
      if (isConnected && address) {
        if (accessToken) {
          const tokenExpired = await verifyAccessToken(accessToken, address);
          if (tokenExpired) {
            setShowSignToast(true);
          } else {
            setShowCreatePersona(true);
          }
        } else {
          setShowSignToast(true);
        }
      }
    };
    authenticateUser();
  }, [address, isConnected, signMessage]);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const res = await axios.get(
          `${API_URL}/userprofile/get?wallet_address=${address}`
        );
        if (res.data.data.new_user) {
          setShowOnboardingToast(true);
        }
        setUserData(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };
    getUserData();
  }, [address]);

  //------- Check if user is logged in-----
  // useEffect(() => {
  //   const verifyUser = async () => {
  //     const accessToken = localStorage.getItem("access_token");
  //     if (isConnected && !accessToken) {
  //       router.push("/auth/signup");
  //     }
  //     if (isConnected && accessToken && address) {
  //       try {
  //         // console.log("verifying jwt", accessToken);
  //         setShowLoader(true);
  //         const tokenExpired = await verifyJwt(accessToken, address);
  //         if (!tokenExpired) {
  //           setShowCreatePersona(true);
  //           setShowLoader(false);
  //         }
  //         if (tokenExpired) {
  //           console.log("token expired");
  //           if (address) {
  //             setShowLoader(false);
  //             router.push("/auth/signup");
  //           }
  //         }
  //       } catch (err) {
  //         console.log(err);
  //         console.log("jumped to catch");
  //       }
  //     }
  //   };
  //   verifyUser();
  // }, [address, isConnected, router]);

  //----------- GET ALL PERSONAS ------------
  useEffect(() => {
    const getAllPersona = async () => {
      try {
        setShowLoader(true);
        const res = await axios.get(`${API_URL}/persona/get/all`);
        setAllPersonas(res.data.data);
        console.log("all personas", res.data.data);
        setShowLoader(false);
      } catch (err) {
        // console.log(err);
        setShowLoader(false);
      }
    };
    getAllPersona();
  }, []);

  return (
    <div>
      <Head>
        <title>Segmentation</title>
        <meta name="description" content="Segmentation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main>
        {showSignToast && (
          <SignToast>
            <span>
              Hey, you haven’t approved the wallet signature request messages .
              Please try again!
            </span>
            <StyledButtonSecondary onClick={getNonceAndSign}>
              Sign message
            </StyledButtonSecondary>
          </SignToast>
        )}
        {!showSignToast && showOnboardingToast && (
          <SignToast>
            <span>
              Hey, your profile is not setup yet. Fill in the details to
              continue
            </span>
            <StyledButtonSecondary onClick={() => router.push("/auth/signup")}>
              Onboarding
            </StyledButtonSecondary>
          </SignToast>
        )}
        <Container>
          {showLoader && <LargeLoader />}
          <LogoContainer>
            <img src="/images/logos/mainLogo.png" alt="Logo" />
          </LogoContainer>
          <Subtitle>
            Create & share personas of wallets for your <br /> project’s active
            or future campaigns.
          </Subtitle>
          <RecentCreatedContainer>
            <RecentCreatedHeader>
              <div>
                <RecentCreatedTitle>
                  Recently created personas
                </RecentCreatedTitle>
                <RecentCreatedSubtitle>
                  By our users on Wall for their campaigns.
                </RecentCreatedSubtitle>
              </div>
              {/* <StyledButtonPrimary>Connect Wallet</StyledButtonPrimary> */}
              <CustomConnectButton />
              {showCreatePersona && (
                <StyledButtonPrimary onClick={() => router.push("/persona")}>
                  Create Persona
                </StyledButtonPrimary>
              )}
            </RecentCreatedHeader>
            <PersonaCardContainer>
              {allPersonas.length < 1 && (
                <PersonaTitle>No persona created yet</PersonaTitle>
              )}
              {allPersonas.map((persona: any) => {
                return (
                  <PersonaCard key={persona.id}>
                    <PersonaTitle>
                      {persona.persona_data.personaName}
                    </PersonaTitle>
                    <div style={{ width: "100%" }}>
                      <PersonaSubtitle>Estimated wallets</PersonaSubtitle>
                      <PersonaWalletCount>
                        {persona?.persona_data?.result?.count || "-"}
                      </PersonaWalletCount>
                    </div>
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        width: "100%",
                      }}
                    >
                      <div>
                        <PersonaSubtitle>from</PersonaSubtitle>
                        <PersonaConditionCount>
                          {calculateFilterCount(persona.persona_data)} filters
                        </PersonaConditionCount>
                      </div>
                      <div
                        style={{
                          display: "flex",
                          flexDirection: "column",
                          alignItems: "end",
                        }}
                      >
                        <PersonaSubtitle>Creator</PersonaSubtitle>
                        <PersonaCreator>
                          {
                            persona?.creator_address?.substring(0, 6) + "...."
                            // persona.creator_address.substring(
                            //   persona.creator_address,
                            //   length - 4,
                            //   persona.creator_address.length - 1
                            // )
                          }
                        </PersonaCreator>
                      </div>
                    </div>
                  </PersonaCard>
                );
              })}
            </PersonaCardContainer>
          </RecentCreatedContainer>
          {/* <StyledLinks>
            <Link href="/auth/signup">Signup</Link>
            <Link href="/auth/login">Login</Link>
            <Link href="/persona">Persona</Link>
          </StyledLinks> */}
        </Container>
      </main>

      <footer></footer>
    </div>
  );
};

const SignToast = styled.div`
  width: 100%;
  padding: 16px;
  position: absolute;
  top: 0;
  left: 0;
  height: 60px;
  gap: 32px;
  background: rgba(251, 191, 36, 0.3);
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  display: flex;
  align-items: center;
  justify-content: center;
  letter-spacing: 0.4px;
  color: #fcd34d;
`;
const StyledLinks = styled.div`
  display: flex;
  justify-content: space-between;
  width: 100%;
  max-width: 400px;
  margin: 0 auto;
  a {
    text-decoration: none;
    color: #fff;
    font-size: 1.5rem;
    font-weight: 600;
    padding: 0.5rem 1rem;
    border: 1px solid #000;
    border-radius: 0.5rem;
    transition: all 0.2s ease-in-out;
    &:hover {
      background: #000;
      color: #fff;
    }
  }
`;
const Container = styled.div`
  padding: 64px;
  display: flex;
  flex-direction: column;
  gap: 16px;
  width: 100%;
  align-items: center;
`;
const RecentCreatedContainer = styled.div`
  width: 100%;
  padding: 24px;
  gap: 24px;
  background: #27272a;
  border-radius: 16px;
`;
const LogoContainer = styled.div`
  margin-top: 120px;
  width: 120px;
  object-fit: contain;
  img {
    width: 100%;
  }
`;
const Subtitle = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  display: flex;
  align-items: center;
  text-align: center;
  letter-spacing: 0.3px;
  color: #a1a1aa;
`;
const RecentCreatedTitle = styled.div`
  font-weight: 500;
  font-size: 16px;
  line-height: 20px;
  display: flex;
  align-items: center;
  letter-spacing: 0.3px;
  color: #e4e4e7;
`;
const RecentCreatedSubtitle = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  margin-top: 12px;
  display: flex;
  align-items: center;
  letter-spacing: 0.3px;
  color: #a1a1aa;
`;
const RecentCreatedHeader = styled.div`
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid #3f3f46;
  padding-bottom: 24px;
  margin-bottom: 24px;
`;
const StyledButtonPrimary = styled.button`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 20px;
  gap: 8px;
  background: ${(props) => (props.disabled ? "#3F3F46" : "#a2a2ff")};
  border-radius: 100px;
  border: none;
  font-weight: 600;
  font-size: 13px;
  height: 40px;
  letter-spacing: 0.1px;
  color: ${(props) => (props.disabled ? "#71717A" : "#1c119b")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
const StyledButtonSecondary = styled.button`
  width: 200px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 8px;
  background: ${(props) => (props.disabled ? "#3F3F46" : "#111315")};
  border-radius: 100px;
  border: none;
  font-weight: 600;
  font-size: 13px;
  line-height: 20px;
  letter-spacing: 0.1px;
  color: ${(props) => (props.disabled ? "#71717A" : "#FCD34D")};
  cursor: ${(props) => (props.disabled ? "not-allowed" : "pointer")};
`;
const PersonaCard = styled.div`
  border: 1px solid #52525b;
  border-radius: 8px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 16px;
  gap: 32px;
  min-width: 250px;

  max-width: 300px;
`;
const PersonaCardContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  padding: 0px;
  gap: 12px;
`;

const PersonaTitle = styled.div`
  font-weight: 500;
  font-size: 15px;
  line-height: 20px;
  color: #ffffff;
`;
const PersonaSubtitle = styled.div`
  font-weight: 400;
  font-size: 11px;
  line-height: 13px;
  color: #71717a;
  margin-bottom: 8px;
`;
const PersonaWalletCount = styled.div`
  font-weight: 500;
  font-size: 20px;
  line-height: 22px;
  color: #c2c1ff;
`;
const PersonaCreator = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  color: #d4d4d8;
`;
const PersonaConditionCount = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 15px;
  color: #c2c1ff;
`;
export default Home;
