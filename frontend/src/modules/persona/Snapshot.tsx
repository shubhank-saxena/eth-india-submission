import axios from "axios";
import React from "react";
import {
  RiBubbleChartLine,
  RiCopperCoinFill,
  RiDeleteBin7Line,
  RiFlashlightFill,
  RiImageFill,
} from "react-icons/ri";
import styled from "styled-components";
import { API_URL } from "../../../constants";
import Dropdown from "../../components/Dropdown";

import { Input } from "../../components/Input";
import SmallLoader from "../../components/SmallLoader";
import { PersonaContext } from "../../contexts/PersonaContext";
import { PersonaSummaryContext } from "../../contexts/PersonaSummaryContext";
import { convertToK, fetchCount } from "../../utils/persona";

const Snapshot = ({
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
  const { personaData, setPersonaData } = React.useContext(PersonaContext);
  const { setShowPersonaSummaryLoader } = React.useContext(
    PersonaSummaryContext
  );

  const [showCountLoader, setShowCountLoader] = React.useState(false);
  const [proposals, setProposals] = React.useState<any[]>([]);
  const [behaviors, setBehaviors] = React.useState<any[]>([]);

  //-------Functions-------//

  //-------Function to check if a filter is complete to calculate counts-------//
  const checkFilterComplete = () => {
    const tempFilter = personaData.blocks[blockId].data.filters[filterId];

    return (
      tempFilter?.filterData?.space?.value &&
      tempFilter?.filterData?.proposal?.value &&
      tempFilter?.filterData?.choice?.value
    );
  };

  //-------Function to search for a snapshot space-------//
  const handleSpaceSearch = async (
    searchValue: string,
    searchEndpoint: string
  ) => {
    if (searchEndpoint) {
      const res = await axios.get(searchEndpoint, {
        params: {
          search_term: searchValue,
        },
      });
      console.log(res.data.data);
      const filteredOptions = res.data.data.map((space: any) => {
        return {
          value: space.snapshot_id,
          label: space.name,
          imageUrl: space.image_link || "/images/assets/default.png",
        };
      });
      console.log(filteredOptions);
      return filteredOptions;
    }
  };
  const handleProposalSearch = async (
    searchValue: string,
    searchEndpoint: string
  ) => {
    if (searchEndpoint) {
      const res = await axios.get(searchEndpoint, {
        params: {
          snapshot_id: searchValue,
        },
      });
      console.log(res.data.data);
      const filteredOptions = res.data.data.map((space: any) => {
        return {
          value: space.snapshot_id,
          label: space.name,
          imageUrl: space.image_link || "/images/assets/default.png",
        };
      });
      console.log(filteredOptions);
      return filteredOptions;
    }
  };

  const fetchProposals = async (snapshotId: string, searchEndpoint: string) => {
    const res = await axios.get(searchEndpoint, {
      params: {
        snapshot_id: snapshotId,
      },
    });
    console.log(res.data.data);
    const proposalOptions = res.data.data.map((proposal: any) => {
      return {
        value: proposal.id,
        label: proposal.title,
      };
    });
    setProposals(proposalOptions);
  };
  const fetchBehaviors = async (proposalId: string, searchEndpoint: string) => {
    const res = await axios.get(searchEndpoint, {
      params: {
        proposal_id: proposalId,
      },
    });
    console.log(res.data.data);
    const behaviorOptions = Object.keys(res.data.data).map((key: any) => {
      return {
        value: key,
        label: res.data.data[key],
      };
    });
    setBehaviors(behaviorOptions);
    // const proposalOptions = res.data.data.map((proposal: any) => {
    //   return {
    //     value: proposal.id,
    //     label: proposal.title,
    //   };
    // });
    // setProposals(proposalOptions);
  };

  //-------Function to update chain of a filter-------//
  const updateSpace = (option: any) => {
    let tempPersonaData = personaData;
    tempPersonaData.blocks[blockId].data.filters[filterId].filterData.space = {
      ...option,
    };

    setPersonaData({ ...tempPersonaData });
    fetchProposals(option.value, API_URL + "/filters/snapshot/proposals");
    // checkFilterComplete() &&
    //   fetchCount({
    //     personaData: tempPersonaData,
    //     setPersonaData,
    //     blockId,
    //     filterId,
    //     setShowPersonaSummaryLoader,
    //     setShowCountLoader,
    //   });
  };

  //-------Function to update behavior option of a filter-------//
  const updateProposal = (option?: any) => {
    let tempPersonaData = personaData;

    tempPersonaData.blocks[blockId].data.filters[filterId].filterData.proposal =
      {
        ...option,
      };

    setPersonaData({ ...tempPersonaData });
    fetchBehaviors(option.value, API_URL + "/filters/snapshot/choices");
    // checkFilterComplete() &&
    //   fetchCount({
    //     personaData: tempPersonaData,
    //     setPersonaData,
    //     blockId,
    //     filterId,
    //     setShowPersonaSummaryLoader,
    //     setShowCountLoader,
    //   });
  };

  const updateBehavior = (option: any) => {
    let tempPersonaData = personaData;
    tempPersonaData.blocks[blockId].data.filters[filterId].filterData.choice = {
      ...option,
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
    <Card>
      <RiFlashlightFill
        size={24}
        color={filterBlockType === "and" ? "#00e1ad" : "#FFB869"}
      />
      <Dropdown
        options={[]}
        label="Spaces"
        selectedChoice={filter.filterData.space.name}
        placeholder={"Select Space"}
        style={{ width: "200px" }}
        onChange={updateSpace}
        searchEndpoint={API_URL + "/filters/snapshot/search"}
        handleNetworkSearch={handleSpaceSearch}
      />
      <Dropdown
        options={proposals}
        label="Proposal"
        selectedChoice={filter.filterData.space.name}
        placeholder={"Select Proposal"}
        style={{ width: "50%" }}
        onChange={updateProposal}
        searchEndpoint={API_URL + "/filters/snapshot/proposals"}
        handleNetworkSearch={handleProposalSearch}
      />
      <Dropdown
        options={behaviors}
        label="Behavior"
        placeholder={"Select Behavior"}
        style={{ width: "200px" }}
        onChange={updateBehavior}
      />

      <WalletCountCard>
        <WalletCountLabel>Wallets</WalletCountLabel>
        <WalletCount>
          {" "}
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

export default Snapshot;
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
  color: #d4d4d8;
`;
const WalletCountLabel = styled.div`
  font-weight: 400;
  font-size: 13px;
  line-height: 20px;
  color: #a1a1aa;
`;
