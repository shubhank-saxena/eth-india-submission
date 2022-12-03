import React from "react";
import {
  RiBubbleChartLine,
  RiCopperCoinFill,
  RiDeleteBin7Line,
  RiFlashlightFill,
  RiImageFill,
} from "react-icons/ri";
import styled from "styled-components";
import Dropdown from "../../components/Dropdown";
import PoapIcon from "/images/assets/poap.svg";
import { Input } from "../../components/Input";

const Poap = ({
  key,
  blockId,
  filterId,
  filterBlockType,
  filter,
  setPersonaData,
  personaData,
}: {
  key: string;
  blockId: string;
  filterId: string;
  filterBlockType: string;
  filter: any;
  setPersonaData: any;
  personaData: any;
}) => {
  const chainOptions = [
    {
      value: "ethereum",
      label: "Ethereum",
    },
    // {
    //   value: "polygon",
    //   label: "Polygon",
    // },
    // {
    //   value: "binance",
    //   label: "Binance",
    // },
  ];
  const behaviorOptions = [
    {
      value: "nfts owned more than",
      label: "NFTs owned more than",
    },
  ];
  return (
    <Card>
      <img
        src="/images/assets/poap.svg"
        alt=""
        style={
          filterBlockType === "and"
            ? { stroke: "#00e1ad" }
            : { stroke: "#FFB869" }
        }
        sizes="24"
      />
      <Dropdown
        options={chainOptions}
        label="POAP"
        placeholder={"Select POAP"}
        style={{ width: "200px", flex: 1 }}
        onChange={() => {}}
      />

      <WalletCountCard>
        <WalletCountLabel>Wallets</WalletCountLabel>
        <WalletCount>0</WalletCount>
      </WalletCountCard>
      <RiDeleteBin7Line size={24} color="#71717A" cursor={"pointer"} />
    </Card>
  );
};

export default Poap;
const Card = styled.div`
  display: flex;
  gap: 16px;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  svg {
    color: inherit;
  }
`;
const WalletCountCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`;
const WalletCount = styled.div`
  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  /* identical to box height, or 154% */

  /* BaseColors/Charcoal Grey/700 */

  color: #d4d4d8;
`;
const WalletCountLabel = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  /* identical to box height, or 154% */

  /* BaseColors/Charcoal Grey/600 */

  color: #a1a1aa;
`;
