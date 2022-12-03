import { ConnectButton } from "@rainbow-me/rainbowkit";
import { RiLinksFill } from "react-icons/ri";
import styled from "styled-components";
export const CustomConnectButton = () => {
  return (
    <ConnectButton.Custom>
      {({
        account,
        chain,
        openAccountModal,
        openChainModal,
        openConnectModal,
        authenticationStatus,
        mounted,
      }) => {
        // Note: If your app doesn't use authentication, you
        // can remove all 'authenticationStatus' checks
        const ready = mounted && authenticationStatus !== "loading";
        const connected =
          ready &&
          account &&
          chain &&
          (!authenticationStatus || authenticationStatus === "authenticated");
        return (
          <div
            {...(!ready && {
              "aria-hidden": true,
              style: {
                opacity: 0,
                pointerEvents: "none",
                userSelect: "none",
              },
            })}
          >
            {(() => {
              if (!connected) {
                return (
                  <StyledButtonPrimary onClick={openConnectModal} type="button">
                    Connect Wallet
                  </StyledButtonPrimary>
                );
              }
              if (chain.unsupported) {
                return (
                  <button onClick={openChainModal} type="button">
                    Wrong network
                  </button>
                );
              }
              return (
                <div style={{ display: "flex", gap: 12 }}>
                  {/* <button
                    onClick={openChainModal}
                    style={{ display: "flex", alignItems: "center" }}
                    type="button"
                  >
                    {chain.hasIcon && (
                      <div
                        style={{
                          background: chain.iconBackground,
                          width: 12,
                          height: 12,
                          borderRadius: 999,
                          overflow: "hidden",
                          marginRight: 4,
                        }}
                      >
                        {chain.iconUrl && (
                          <img
                            alt={chain.name ?? "Chain icon"}
                            src={chain.iconUrl}
                            style={{ width: 12, height: 12 }}
                          />
                        )}
                      </div>
                    )}
                    {chain.name}
                  </button> */}
                  <StyledButtonSecondary
                    onClick={openAccountModal}
                    type="button"
                  >
                    <RiLinksFill />
                    {account.displayName}
                    {account.displayBalance
                      ? ` (${account.displayBalance})`
                      : ""}
                  </StyledButtonSecondary>
                </div>
              );
            })()}
          </div>
        );
      }}
    </ConnectButton.Custom>
  );
};
const StyledButtonPrimary = styled.button`
  width: 200px;
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
