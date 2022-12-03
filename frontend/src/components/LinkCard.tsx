import { useState } from "react";
import { RiArrowRightLine, RiTwitterLine } from "react-icons/ri";
import styled from "styled-components";

const LinkCard = ({
  placeholder,
  buttonText,
  children,
  onClick,
  variant,
  isActive = false,
}: {
  placeholder: string;
  buttonText: string;
  children: React.ReactNode;
  onClick: (value: string) => void;
  variant: "auth" | "default";
  isActive: boolean;
}) => {
  const [showLinkInput, setShowLinkInput] = useState(false);
  const [link, setLink] = useState("");
  return (
    <Container>
      <StyledLinkIcons
        isActive={isActive}
        onClick={() => {
          variant == "auth" ? onClick(link) : setShowLinkInput(!showLinkInput);
        }}
      >
        {children}
      </StyledLinkIcons>
      {showLinkInput && (
        <StyledLinkInputCard>
          <StyledLinkInput
            placeholder={placeholder || "Enter link"}
            onChange={(e) => setLink(e.target.value)}
          />
          <StyledButtonPrimaryRoundedSquare
            onClick={() => {
              onClick(link);
              setShowLinkInput(false);
            }}
          >
            <RiArrowRightLine size={20} />
            {buttonText}{" "}
          </StyledButtonPrimaryRoundedSquare>
        </StyledLinkInputCard>
      )}
    </Container>
  );
};
const Container = styled.div`
  position: relative;
`;
const StyledLinkIcons = styled.a<{ isActive: boolean }>`
  width: 48px;
  height: 48px;
  padding: 12px;
  display: flex;
  align-items: center;
  justify-content: center;
  /* BaseColors/Charcoal Grey/400 */
  border: 1px solid #52525b;
  border-radius: 8px;
  cursor: pointer;
  svg {
    width: 24px;
    height: 24px;
    color: ${(props) => (props.isActive ? "#8383FF" : "#71717A")};
  }
`;

const StyledLinkInputCard = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  display: flex;
  z-index: 1000;
  flex-direction: column;
  gap: 12px;
  background: #3f3f46;
  box-shadow: 0px 4px 12px rgba(24, 24, 27, 0.25);
  border-radius: 8px;
  padding: 8px;
`;
const StyledLinkInput = styled.input`
  width: 300px;
  height: 40px;
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
    color: #a1a1aa;
  }
`;
const StyledButtonPrimaryRoundedSquare = styled.button`
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 8px;
  background: ${(props) => (props.disabled ? "#3F3F46" : "#a2a2ff")};
  border-radius: 8px;
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
export default LinkCard;
