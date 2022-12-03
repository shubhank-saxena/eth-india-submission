import Head from "next/head";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { RiLockUnlockFill } from "react-icons/ri";
import styled from "styled-components";
import { useAccount } from "wagmi";
import AddFilters from "../../src/components/AddFilters";
import AndBlock from "../../src/components/AndBlock";
import Dropdown from "../../src/components/Dropdown";
import { Input } from "../../src/components/Input";
import OrBlock from "../../src/components/OrBlock";
import Toggle from "../../src/components/Toggle";
import { PersonaContext } from "../../src/contexts/PersonaContext";
import BehavioralFilterCard from "../../src/modules/persona/BehavioralFilterCard";
import ErcToken from "../../src/modules/persona/ErcToken";
import NftCollectors from "../../src/modules/persona/NftCollectors";
import PersonaSummary from "../../src/modules/persona/PersonaSummary";
import Poap from "../../src/modules/persona/Poap";
import Snapshot from "../../src/modules/persona/Snapshot";
import { verifyAccessToken } from "../../src/utils/auth";

/*const personaStruct = {
  csv: {
    csvFileLink: "",
  }, // csv data
  walletMapper: {
    behavioralFilters: {
      0: {
        type: "condition",
        properties: {
          chain: "evm",
          behavior: "nfts owned more than",
          parameter: "500",
        },
      },
      1: {
        type: "relation",
        value: "and/or",
      },
      2: {
        type: "condition",
        properties: {},
      },
    }, // wallet behavioral filters
    nftCollectors: {
      0: {
        type: "condition",
        properties: {},
      },
      1: {
        type: "relation",
        value: "and/or",
      },
      2: {
        type: "condition",
        properties: {},
      },
    }, // nft collectors data
    ercTokens: {
      0: {
        type: "condition",
        properties: {},
      },
      1: {
        type: "relation",
        value: "and/or",
      },
      2: {
        type: "condition",
        properties: {},
      },
    }, // erc20, erc721, erc1155
    poaps: {
      0: {
        type: "condition",
        properties: {},
      },
      1: {
        type: "relation",
        value: "and/or",
      },
      2: {
        type: "condition",
        properties: {},
      },
    }, // poap data
    snapshots: {
      0: {
        type: "condition",
        properties: {},
      },
      1: {
        type: "relation",
        value: "and/or",
      },
      2: {
        type: "condition",
        properties: {},
      },
      3: {
        type: "relation",
        value: "and/or",
      },
      4: {
        type: "condition",
        properties: {},
      },
    }, // Snapshot data
  }, // wallet mapper data
  existingPersona: {
    personaId: "", // existing persona id
  }, // existing persona data
};*/
const visibilityOptions = [
  {
    value: "public",
    label: "Public",
    icon: <RiLockUnlockFill />,
  },
];

const persona: any = {
  personaName: "",
  personaVisibility: "public",
  blocks: {},
};

const Persona = () => {
  const { personaData, setPersonaData } = useContext(PersonaContext);
  const { address, isConnected } = useAccount();
  const router = useRouter();
  useEffect(() => {
    console.log(personaData);
  }, [personaData]);

  useEffect(() => {
    console.log("address", address);
    console.log("isConnected", isConnected);
    const verifyUser = async () => {
      const accessToken = localStorage.getItem("access_token");
      if (!accessToken) {
        router.push("/");
        console.log("pushed to home");
      }
      if (isConnected && accessToken && address) {
        const tokenExpired = await verifyAccessToken(accessToken, address);
        if (tokenExpired) {
          console.log("token expired");
          if (address) {
            router.push("/auth/signup");
            console.log("pushed to signup");
          } else {
            router.push("/");
            console.log("pushed to home");
          }
        }
      }
    };
    verifyUser();
  }, [address, isConnected, router]);

  useEffect(() => {
    localStorage.getItem("persona") &&
      setPersonaData(JSON.parse(localStorage.getItem("persona") || persona));
  }, []);
  const renderFilter = ({
    filter,
    blockId,
    filterId,
    block,
  }: {
    filter: any;
    blockId: string;
    filterId: string;
    block: string;
  }) => {
    switch (filter.filterType) {
      case "behavioral":
        return (
          <BehavioralFilterCard
            key={filter.filterId}
            blockId={blockId}
            filterId={filterId}
            filterBlockType={block}
            filter={filter}
            // setPersonaData={setPersonaData}
            // personaData={personaData}
          />
        );
      case "nftCollectors":
        return (
          <NftCollectors
            key={filter.filterId}
            blockId={blockId}
            filterId={filterId}
            filterBlockType={block}
            filter={filter}
          />
        );
      case "ercTokens":
        return (
          <ErcToken
            key={filter.filterId}
            blockId={blockId}
            filterId={filterId}
            filterBlockType={block}
            filter={filter}
          />
        );
      case "snapshot":
        return (
          <Snapshot
            key={filter.filterId}
            blockId={blockId}
            filterId={filterId}
            filterBlockType={block}
            filter={filter}
          />
        );
      case "poap":
        return (
          <Poap
            key={filter.filterId}
            blockId={blockId}
            filterId={filterId}
            filterBlockType={block}
            filter={filter}
            setPersonaData={setPersonaData}
            personaData={personaData}
          />
        );
      default:
        return <p>Error occurred</p>;
    }
  };
  const getFilterTemplate = (filterType: string) => {
    switch (filterType) {
      case "behavioral":
        return {
          chain: {
            id: "",
            name: "",
          },
          parentFilter: {
            value: "",
            label: "",
          },
          childFilter: {
            value: "",
            label: "",
          },
          grandChildFilter: {
            value: "",
            label: "",
          },
          parameter: "",
        };
      case "nftCollectors":
        return {
          chain: {
            id: "",
            name: "",
          },
          collection: {
            id: "",
            name: "",
          },
          parentFilter: {
            id: "",
            name: "",
          },
          childFilter: {
            id: "",
            name: "",
          },
          grandChildFilter: {
            id: "",
            name: "",
          },
          parameter: "",
        };
      case "ercTokens":
        return {
          chain: {
            id: "",
            name: "",
          },
          token: {
            id: "",
            name: "",
          },
          parentFilter: {
            id: "",
            name: "",
          },
          childFilter: {
            id: "",
            name: "",
          },
          grandChildFilter: {
            id: "",
            name: "",
          },
          parameter: "",
        };
      case "snapshot":
        return {
          space: {
            id: "",
            name: "",
          },
          proposal: {
            id: "",
            name: "",
          },
          choice: {
            id: "",
            name: "",
          },
        };
      case "poap":
        return {
          collection: {
            id: "",
            name: "",
          },
        };
    }
  };

  const addBlockToPersona = ({ blockType }: { blockType: string }) => {
    const blockId = Math.random().toString(36).substr(2, 9);
    const block = {
      type: "filter",
      id: blockId,
      data: {
        blockName: personaData?.blocks
          ? `Block ${Math.ceil(Object.keys(personaData.blocks).length / 2) + 1}`
          : `Block 1`,
        blockType: blockType,
        filters: {},
      },
    };
    setPersonaData({
      ...personaData,
      blocks: {
        ...personaData.blocks,

        [Object.keys(personaData.blocks).length]:
          Object.keys(personaData.blocks).length > 0
            ? {
                id: Math.random().toString(36).substr(2, 9),
                type: "relation",
                data: {
                  relationType: "or",
                },
              }
            : block,
        ...(Object.keys(personaData.blocks).length > 0 && {
          [Object.keys(personaData.blocks).length + 1]: block,
        }),
      },
    });
    window.scrollTo(0, document.body.scrollHeight);
  };

  const addFilterToBlock = ({
    filterType,
    blockId,
  }: {
    blockId: string;
    filterType: string;
  }) => {
    const newFilter = {
      filterId: Math.random().toString(36).substr(2, 9),
      filterType: filterType,

      filterData: getFilterTemplate(filterType),
    };
    console.log("newFilter", newFilter);
    Object.keys(personaData.blocks).map((block) => {
      if (personaData.blocks[block].id === blockId) {
        setPersonaData({
          ...personaData,
          blocks: {
            ...personaData.blocks,
            [block]: {
              ...personaData.blocks[block],
              data: {
                ...personaData.blocks[block].data,
                filters: {
                  ...personaData.blocks[block].data.filters,
                  [Object.keys(personaData.blocks[block].data.filters).length]:
                    newFilter,
                },
              },
            },
          },
        });
      }
    });
  };

  const deleteBlock = ({ blockId }: { blockId: string }) => {
    console.log("delete block", blockId);
    const newBlocks = {
      ...personaData.blocks,
    };
    Object.keys(personaData.blocks).map((block, index) => {
      console.log(personaData.blocks[block].id);
      if (personaData.blocks[block].id === blockId) {
        delete newBlocks[block];
        if (index !== Object.keys(personaData.blocks).length - 1) {
          delete newBlocks[index + 1];
        }
      }
      let tempBlocks = {};
      Object.keys(newBlocks).map((block, index) => {
        tempBlocks = {
          ...tempBlocks,
          [index]: newBlocks[block],
        };
      });
      console.log(tempBlocks);
      setPersonaData({
        ...personaData,
        blocks: tempBlocks,
      });
    });
  };

  // useEffect(() => {
  //   console.log(personaData);
  // }, [personaData]);
  const updatePersonaName = (e: any) => {
    const personaName = e.target.value;
    setPersonaData({
      ...personaData,
      personaName: personaName,
    });
  };
  return (
    <div style={{ display: "flex", gap: "16px", padding: "32px" }}>
      <Head>
        <title>Segmentation-Persona</title>
        <meta name="description" content="Segmentation" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <div style={{ width: "100%" }}>
        <h1>Persona</h1>
        <Container>
          <h3>Create a persona</h3>
          <div style={{ display: "flex", width: "100%" }}>
            <Input
              label={"Name"}
              placeholder={"Choose a name for your persona"}
              style={{ width: "80%" }}
              defaultValue={personaData?.personaName}
              onChange={(e) => {
                updatePersonaName(e);
              }}
            />
            <Dropdown
              label={"Visibility"}
              style={{ width: "200px" }}
              options={visibilityOptions}
              onChange={() => {}}
            ></Dropdown>
          </div>
        </Container>
        {personaData.blocks &&
          Object.keys(personaData.blocks).map((blockId) => {
            const block: any = personaData.blocks[blockId];
            if (block.type === "filter") {
              return block.data.blockType === "and" ? (
                <AndBlock
                  key={block.id}
                  blockName={block.blockName}
                  onClick={() => deleteBlock({ blockId: block.id })}
                >
                  {Object.keys(block.data.filters).map((filterId) => {
                    const filter = block.data.filters[filterId];
                    return renderFilter({
                      filter,
                      blockId,
                      filterId,
                      block: "and",
                    });
                  })}
                  <AddFilters
                    addFilterToBlock={addFilterToBlock}
                    blockId={block.id}
                  ></AddFilters>
                </AndBlock>
              ) : (
                <OrBlock
                  key={block.id}
                  blockName={block.blockName}
                  onClick={() => deleteBlock({ blockId: block.id })}
                >
                  {Object.keys(block.data.filters).map((filterId, index) => {
                    const filter = block.data.filters[filterId];
                    return renderFilter({
                      filter,
                      blockId,
                      filterId,
                      block: "or",
                    });
                  })}
                  <AddFilters
                    addFilterToBlock={addFilterToBlock}
                    blockId={block.id}
                  ></AddFilters>
                </OrBlock>
              );
            } else if (block.type === "relation") {
              return (
                <Toggle
                  key={block.id}
                  value={block.data.relationType}
                  blockId={blockId}
                  personaData={personaData}
                  setPersonaData={setPersonaData}
                />
              );
            }
          })}
        <AddBlockContainer>
          <VerticalSpacer></VerticalSpacer>
          <AddBlockButtonContainer>
            <AddBlockButton
              block="and"
              onClick={() => addBlockToPersona({ blockType: "and" })}
            >
              And Block
            </AddBlockButton>

            <AddBlockButton
              block="or"
              onClick={() => addBlockToPersona({ blockType: "or" })}
            >
              Or Block
            </AddBlockButton>
          </AddBlockButtonContainer>
        </AddBlockContainer>
      </div>
      <PersonaSummary persona={personaData} />
    </div>
  );
};

export default Persona;

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  padding: 24px;
  gap: 24px;
  margin-bottom: 16px;
  /* width: 894px;
  height: 231px; */
  background: #27272a;
  border-radius: 8px;

  h3 {
    font-weight: 400;
    font-size: 15px;
    line-height: 15px;
    color: #a1a1aa;
  }
`;

const AddBlockContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;
const VerticalSpacer = styled.div`
  width: 1px;
  height: 40px;
  background: #27272a;
`;
const AddBlockButtonContainer = styled.div`
  align-items: center;
  display: flex;
  gap: 16px;
  /* background: transparent; */
  /* border: none; */
`;
const AddBlockButton = styled.button<{ block: string }>`
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  padding: 10px 24px;
  gap: 8px;
  cursor: pointer;
  width: 150px;
  height: 40px;

  background: transparent;

  /* BaseColors/Sea Green/300 */

  border: ${(props) =>
    props.block === "and" ? "1px solid #00e1ad" : "1px solid #E99A3A"};

  border-radius: 100px;

  font-weight: 500;
  font-size: 13px;
  line-height: 20px;
  /* identical to box height, or 154% */

  text-align: center;
  letter-spacing: 0.1px;

  /* BaseColors/Sea Green/300 */

  color: ${(props) => (props.block === "and" ? " #00e1ad" : " #E99A3A")};
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
