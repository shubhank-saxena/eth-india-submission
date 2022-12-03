import React, { useRef } from "react";
import {
  RiBubbleChartLine,
  RiCopperCoinFill,
  RiFlashlightFill,
  RiImageFill,
} from "react-icons/ri";
import styled from "styled-components";
import useHandleClickOutside from "../hooks/useHandleClickOutside";

const AddFilters = ({
  addFilterToBlock,
  blockId,
}: {
  addFilterToBlock: any;
  blockId: string;
}) => {
  const filterMenuRef = useRef<HTMLDivElement>(null);

  const [showFilters, setShowFilters] = React.useState(false);
  useHandleClickOutside(filterMenuRef, () => setShowFilters(false));

  const filter = [
    {
      icon: <RiBubbleChartLine size={24} />,
      label: "Behavioral Filters",
      value: "behavioral",
      description: "Find wallets that have a specific trait.",
    },
    {
      icon: <RiImageFill size={24} />,
      label: "NFT Collectors",
      value: "nftCollectors",
      description: "Find wallets that have a specific NFT.",
    },
    {
      icon: <RiCopperCoinFill size={24} />,
      label: "ERC Tokens",
      value: "ercTokens",
      description: "Find wallets that have a specific ERC token.",
    },
    {
      icon: <RiFlashlightFill size={24} />,
      label: "SnapShot",
      value: "snapshot",
      description: "Find wallets that have a specific NFT.",
    },
    // {
    //   icon: (
    //     <img src="/images/assets/poap.svg" alt="" color="white" sizes="24" />
    //   ),
    //   label: "POAP",
    //   value: "poap",
    //   description: "Find wallets that have a specific POAP.",
    // },
  ];

  return (
    <Container ref={filterMenuRef}>
      <StyledButtonSecondary onClick={() => setShowFilters(true)}>
        <span style={{ fontSize: "14px" }}>+</span>
        Add Filter
      </StyledButtonSecondary>
      {showFilters && (
        <FilterCardContainer>
          {filter.map((item, index) => {
            return (
              <FilterCard
                key={index}
                onClick={() => {
                  addFilterToBlock({
                    blockId: blockId,
                    filterType: item.value,
                  });
                  setShowFilters(false);
                }}
              >
                <FilterIcon>{item.icon}</FilterIcon>
                <FilterText>
                  <FilterTitle>{item.label}</FilterTitle>
                  <FilterDescription>{item.description}</FilterDescription>
                </FilterText>
              </FilterCard>
            );
          })}
        </FilterCardContainer>
      )}
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  position: relative;
  /* width: 100%; */
`;

const FilterCardContainer = styled.div`
  /* Auto layout */
  position: absolute;
  display: flex;
  z-index: 1000000;
  flex-direction: column;
  align-items: center;
  padding: 8px 0px;

  top: 100%;

  /* Color/Surface/3 */

  background: #3f3f46;
  box-shadow: 0px 4px 12px rgba(24, 24, 27, 0.25);
  border-radius: 8px;
`;
const FilterCard = styled.div`
  display: flex;
  gap: 16px;
  padding: 16px;
  width: 100%;

  cursor: pointer;

  :hover {
    background: #52525b;
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
const FilterText = styled.div``;
const FilterIcon = styled.div`
  svg {
    size: 24px;
  }
`;
const FilterTitle = styled.div`
  font-weight: 500;
  font-size: 15px;
  line-height: 24px;
  /* identical to box height, or 160% */

  /* BaseColors/Charcoal Grey/900 */

  color: #f5f5f5;
`;
const FilterDescription = styled.div`
  font-weight: 400;
  font-size: 11px;
  line-height: 14px;
  /* or 127% */

  /* BaseColors/Charcoal Grey/700 */

  color: #d4d4d8;
`;
export default AddFilters;
