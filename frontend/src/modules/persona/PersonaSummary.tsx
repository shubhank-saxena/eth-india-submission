import axios from "axios";
import React, { useState } from "react";
import styled from "styled-components";
import { API_URL } from "../../../constants";
import LargeLoader from "../../components/LargeLoader";
import SmallLoader from "../../components/SmallLoader";
import VisualToggle from "../../components/VisualToggle";
import { PersonaSummaryContext } from "../../contexts/PersonaSummaryContext";
import { calculateFilterCount, convertToK } from "../../utils/persona";

const PersonaSummary = ({ persona }: { persona: any }) => {
  //-------States-------//
  const [showLoader, setShowLoader] = useState(false);
  const { showPersonaSummaryLoader } = React.useContext(PersonaSummaryContext);

  //-------Functions-------//

  //-------Function to save persona to db-------//
  const savePersona = async () => {
    setShowLoader(true);
    console.log("save persona", persona);
    const accessToken = localStorage.getItem("access_token");
    localStorage.setItem("persona", JSON.stringify(persona));

    try {
      const res = await axios.post(
        `${API_URL}/persona/save`,
        {
          persona_object: persona,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      localStorage.removeItem("persona");

      const res2 = await axios.post(
        `${API_URL}/persona/filters/data`,
        {
          persona_object: { ...persona, isCount: false },
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
          },
        }
      );
      const url = window.URL.createObjectURL(new Blob([res2.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "wallets.csv");
      document.body.appendChild(link);
      link.click();

      setShowLoader(false);
    } catch (err) {
      console.log(err);
      setShowLoader(false);
    }
  };

  //-------Render-------//
  return (
    <Container>
      {showLoader && <LargeLoader />}
      <Subtitle>Total estimated wallets</Subtitle>
      {showPersonaSummaryLoader ? (
        <SmallLoader />
      ) : (
        <WalletCount>{persona.result?.count || 0}</WalletCount>
      )}
      <Subtitle>from {calculateFilterCount(persona)} filters</Subtitle>

      <FiltersBlock>
        {persona.blocks &&
          Object.keys(persona.blocks).map((blockId) => {
            const block: any = persona.blocks[blockId];
            if (block.type === "filter") {
              return block.data.blockType === "and" ? (
                <SmallAndBlock key={block.id}>
                  <BlockName>{block.data.blockName}</BlockName>
                  <FlexBlock>
                    <span>
                      {Object.keys(block.data.filters).length} Filters
                    </span>
                    {showPersonaSummaryLoader ? (
                      <SmallLoader />
                    ) : (
                      <span>
                        {convertToK(block.result?.count) || 0} wallets
                      </span>
                    )}
                  </FlexBlock>
                </SmallAndBlock>
              ) : (
                <SmallOrBlock key={block.id}>
                  <BlockName>{block.data.blockName}</BlockName>
                  <FlexBlock>
                    <span>
                      {Object.keys(block.data.filters).length} Filters
                    </span>
                    {showPersonaSummaryLoader ? (
                      <SmallLoader />
                    ) : (
                      <span>
                        {convertToK(block.result?.count) || 0} wallets
                      </span>
                    )}
                  </FlexBlock>
                </SmallOrBlock>
              );
            } else if (block.type === "relation") {
              return (
                <VisualToggle
                  key={block.id}
                  value={block.data.relationType}
                  variant="short"
                />
              );
            }
          })}
      </FiltersBlock>
      <StyledButtonPrimary onClick={savePersona}>
        Save Persona
      </StyledButtonPrimary>
    </Container>
  );
};


//----------Styled components-------------//
const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 16px;
  max-height: 600px;
  gap: 16px;
  border: 1px solid #3f3f46;
  border-radius: 8px;
  width: 300px;
`;
const StyledButtonPrimary = styled.button`
  width: 100%;
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

const Subtitle = styled.h3`
  font-weight: 400;
  font-size: 13px;
  line-height: 24px;
  /* identical to box height, or 185% */

  text-align: center;

  /* BaseColors/Charcoal Grey/600 */

  color: #a1a1aa;
`;
const WalletCount = styled.h2`
  font-weight: 400;
  font-size: 30px;
  line-height: 32px;
  /* identical to box height, or 107% */

  text-align: center;

  color: #c2c1ff;
`;
const FiltersBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 8px 0px;
  overflow-y: scroll;
  width: 100%;
  /* Color/Surface/1_Stroke */

  border-width: 1px 0px;
  border-style: solid;
  border-color: #3f3f46;
`;
const SmallAndBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px;
  width: 100%;
  gap: 8px;
  background: #27272a;
  border: 1px solid #00e1ad;
  border-radius: 8px;
  color: #00e1ad;
`;
const SmallOrBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 12px;
  width: 100%;
  gap: 8px;
  background: #27272a;
  border: 1px solid #ffb869;
  border-radius: 8px;
  color: #ffb869;
`;
const BlockName = styled.h3`
  font-weight: 500;
  font-size: 15px;
  line-height: 24px;
`;
const FlexBlock = styled.div`
  width: 100%;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
  color: #d4d4d8;
`;
export default PersonaSummary;
