import React from "react";
import { RiBubbleChartLine, RiDeleteBin7Line } from "react-icons/ri";
import styled from "styled-components";
import Dropdown from "../../components/Dropdown";
import { Input } from "../../components/Input";
import SmallLoader from "../../components/SmallLoader";
import { PersonaContext } from "../../contexts/PersonaContext";
import { PersonaSummaryContext } from "../../contexts/PersonaSummaryContext";
import { convertToK, debounce, fetchCount } from "../../utils/persona";

//-------Constants-------//
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
    value: "nfts_holding",
    label: "NFTs holding",
    children: [
      {
        value: "greater_than",
        label: "Greater than",
      },
      {
        value: "less_than",
        label: "Less than",
      },
    ],
  },
  {
    value: "nfts_holding_ever",
    label: "NFTs holding ever",
    children: [
      {
        value: "greater_than",
        label: "Greater than",
      },
      {
        value: "less_than",
        label: "Less than",
      },
    ],
  },
];

const BehavioralFilterCard = ({
  key,
  blockId,
  filterId,
  filterBlockType,
  filter,
}: {
  key: string;
  blockId: string;
  filterId: string;
  filterBlockType: string;
  filter: any;
}) => {
  //-------States-------//

  const { personaData, setPersonaData } = React.useContext(PersonaContext);
  const { setShowPersonaSummaryLoader } = React.useContext(
    PersonaSummaryContext
  );
  const [showCountLoader, setShowCountLoader] = React.useState(false);

  //-------Functions-------//

  //-------Function to check if a filter is complete to calculate counts-------//
  const checkFilterComplete = () => {
    const tempFilter = personaData.blocks[blockId].data.filters[filterId];

    return (
      tempFilter?.filterData?.parentFilter?.value &&
      tempFilter?.filterData?.parameter &&
      tempFilter?.filterData?.chain?.value
    );
  };

  //-------Function to update parameter of a filter-------//
  const updateParameter = (e: any) => {
    const newValue = e.target.value;
    let tempPersonaData = personaData;
    // console.log(
    //   "new filter",
    //   tempPersonaData.blocks[blockId].data.filters[filterId]
    // );
    // console.log("filterId", filterId);
    tempPersonaData.blocks[blockId].data.filters[
      filterId
    ].filterData.parameter = newValue;

    setPersonaData({ ...tempPersonaData });
    checkFilterComplete() &&
      fetchCount({
        personaData: tempPersonaData,
        setPersonaData,
        blockId,
        filterId,
        setShowPersonaSummaryLoader,
        setShowCountLoader,
      });
  };

  //-------Function to update chain of a filter-------//
  const updateChain = (selectedChain: any) => {
    let tempPersonaData = personaData;

    tempPersonaData.blocks[blockId].data.filters[filterId].filterData.chain = {
      ...selectedChain,
    };

    setPersonaData({ ...tempPersonaData });

    checkFilterComplete() &&
      fetchCount({
        personaData: tempPersonaData,
        setPersonaData,
        blockId,
        filterId,
        setShowPersonaSummaryLoader,
        setShowCountLoader,
      });
  };

  //-------Function to update behavior option of a filter-------//
  const updateBehavior = (option?: any, subOption?: any, subOption2?: any) => {
    let tempPersonaData = personaData;

    tempPersonaData.blocks[blockId].data.filters[
      filterId
    ].filterData.parentFilter = {
      ...option,
    };
    tempPersonaData.blocks[blockId].data.filters[
      filterId
    ].filterData.childFilter = {
      ...subOption,
    };
    tempPersonaData.blocks[blockId].data.filters[
      filterId
    ].filterData.grandChildFilter = {
      ...subOption2,
    };

    setPersonaData({ ...tempPersonaData });
    checkFilterComplete() &&
      fetchCount({
        personaData: tempPersonaData,
        setPersonaData,
        blockId,
        filterId,
        setShowPersonaSummaryLoader,
        setShowCountLoader,
      });
  };

  //-------Function to delete a filter from a block-------//
  const deleteFilter = () => {
    let tempPersonaData = personaData;

    delete tempPersonaData.blocks[blockId].data.filters[filterId];

    tempPersonaData.blocks[blockId].data["tempFilters"] = {};

    Object.keys(tempPersonaData.blocks[blockId].data.filters).forEach(
      (filter, index) => {
        console.log("filter", filter);
        tempPersonaData.blocks[blockId].data["tempFilters"][index] =
          tempPersonaData.blocks[blockId].data.filters[filter];
      }
    );

    tempPersonaData.blocks[blockId].data.filters =
      tempPersonaData.blocks[blockId].data.tempFilters;

    delete tempPersonaData.blocks[blockId].data.tempFilters;

    setPersonaData({ ...tempPersonaData });

    checkFilterComplete() &&
      fetchCount({
        personaData: tempPersonaData,
        setPersonaData,
        blockId,
        filterId,
        setShowPersonaSummaryLoader,
        setShowCountLoader,
      });
  };

  //-------Render-------//

  return (
    <Card key={key}>
      <RiBubbleChartLine
        size={24}
        color={filterBlockType === "and" ? "#00e1ad" : "#FFB869"}
      />
      <Dropdown
        options={chainOptions}
        label="Chain"
        placeholder={"Select Chain"}
        style={{ width: "200px" }}
        onChange={updateChain}
        selectedChoice={filter.filterData.chain.label}
        search={false}
      />
      <Dropdown
        options={behaviorOptions}
        label="Behavior"
        placeholder={"Select Behavior"}
        style={{ width: "50%", flex: 1 }}
        onChange={updateBehavior}
        selectedChoice={
          filter.filterData?.grandChildFilter?.label
            ? filter.filterData?.parentFilter?.label +
              "->" +
              filter.filterData?.childFilter?.label +
              "->" +
              filter.filterData.grandChildFilter.label
            : filter.filterData?.childFilter?.label
            ? filter.filterData?.parentFilter?.label +
              "->" +
              filter.filterData?.childFilter?.label
            : filter.filterData?.parentFilter?.label
            ? filter.filterData?.parentFilter?.label
            : "Select Behavior"
        }
        search={false}
      />
      <Input
        label="Parameter"
        placeholder="0"
        style={{ width: "100px" }}
        onChange={debounce(updateParameter, 300)}
        defaultValue={filter.filterData.parameter}
      />
      <WalletCountCard>
        <WalletCountLabel>Wallets</WalletCountLabel>
        <WalletCount>
          {showCountLoader ? (
            <SmallLoader />
          ) : (
            convertToK(
              personaData.blocks[blockId].data.filters[filterId]?.result?.count
            ) || 0
          )}
        </WalletCount>
      </WalletCountCard>
      <RiDeleteBin7Line
        size={24}
        color="#71717A"
        cursor={"pointer"}
        onClick={deleteFilter}
      />
    </Card>
  );
};

export default BehavioralFilterCard;

//--------Styled Components------//
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
  max-height: 20px;
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
