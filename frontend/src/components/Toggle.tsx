import axios from "axios";
import { useContext, useState } from "react";
import styled from "styled-components";
import { API_URL } from "../../constants";
import { PersonaSummaryContext } from "../contexts/PersonaSummaryContext";
import { fetchPersonaCount } from "../utils/persona";

const Toggle = ({
  variant,
  value,
  blockId,
  personaData,
  setPersonaData,
}: {
  variant?: string;
  value?: string;
  blockId?: string;
  setPersonaData: any;
  personaData: any;
}) => {
  const [checked, setChecked] = useState(value === "and");
  const { setShowPersonaSummaryLoader } = useContext(PersonaSummaryContext);
  const updateRelation = async (isChecked: boolean) => {
    const newPersonaData = { ...personaData };
    if (blockId) {
      console.log("checked", isChecked);
      newPersonaData.blocks[blockId].data.relationType = isChecked
        ? "and"
        : "or";
      setPersonaData({ ...newPersonaData });
      fetchPersonaCount({
        personaData: newPersonaData,
        setPersonaData,
        setShowPersonaSummaryLoader,
      });
    }
  };

  return (
    <Container>
      <Spacer variant={variant}></Spacer>
      <HorizontalToggle>
        <input
          type="checkbox"
          onChange={(e) => {
            console.log("vales", e.target.checked);
            setChecked(e.target.checked);
            updateRelation(e.target.checked);
          }}
        />
        <ToggleOption checked={checked}>AND</ToggleOption>
        <ToggleOption checked={!checked}>OR</ToggleOption>
      </HorizontalToggle>
      <Spacer variant={variant}></Spacer>
    </Container>
  );
};
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const Spacer = styled.div<{ variant?: string }>`
  width: 1px;
  height: ${(props) => (props.variant === "short" ? "16px" : "40px")};

  background: #27272a;
`;
const HorizontalToggle = styled.label`
  cursor: pointer;
  position: relative;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  padding: 8px;
  gap: 4px;
  width: 116px;
  height: 40px;
  /* Color/Surface/2 */
  background: #27272a;
  /* BaseColors/Royal Blue/300 */
  border: 1px solid #c2c1ff;
  border-radius: 99px;
  input {
    opacity: 0;
    width: 0;
    height: 0;
    position: absolute;
    top: 0;
    left: 0;
  }
`;
const ToggleOption = styled.div<{ checked: boolean }>`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 4px 0px;
  gap: 8px;

  width: 48px;
  height: 24px;

  /* BaseColors/Royal Blue/300 */

  background: ${(props) => (props.checked ? "#c2c1ff" : "transparent")};

  /* BaseColors/Royal Blue/300 */

  border: ${(props) => (props.checked ? "1px solid #c2c1ff" : "none")};

  border-radius: 58px;
  font-weight: 500;
  font-size: 13px;
  line-height: 16px;
  /* identical to box height, or 123% */

  /* BaseColors/Royal Blue/900 */

  color: ${(props) => (props.checked ? "#1a1a1a" : "#A1A1AA")};
`;
export default Toggle;
