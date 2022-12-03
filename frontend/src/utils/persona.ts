import axios from "axios";
import { toast } from "react-toastify";
import { API_URL } from "../../constants";

export const fetchPersonaCount = async ({
  personaData,
  setPersonaData,
  setShowPersonaSummaryLoader,
}: {
  personaData: any;
  setPersonaData: any;
  setShowPersonaSummaryLoader: any;
}) => {
  try {
    setShowPersonaSummaryLoader(true);

    const { data } = await axios.post(`${API_URL}/persona/filter/count`, {
      persona_object: {
        ...personaData,
        isCount: true,
      },
    });

    setPersonaData((prevPersonaData: any) => {
      let tempPersonaData = { ...prevPersonaData };

      tempPersonaData.result = {
        count: data?.data?.count,
      };
      return tempPersonaData;
    });
    setShowPersonaSummaryLoader(false);
  } catch (err) {
    setShowPersonaSummaryLoader(false);

    toast.error("Error fetching persona count");
  }
};
export const fetchBlockCount = async ({
  personaData,
  setPersonaData,
  setShowPersonaSummaryLoader,
  blockId,
}: {
  personaData: any;
  setPersonaData: any;
  setShowPersonaSummaryLoader: any;
  blockId: any;
}) => {
  try {
    setShowPersonaSummaryLoader(true);
    const { data } = await axios.post(`${API_URL}/filters/block/count`, {
      block_object: {
        ...personaData.blocks[blockId],
      },
    });

    setPersonaData((prevPersonaData: any) => {
      let tempPersonaData = { ...prevPersonaData };

      tempPersonaData.blocks[blockId].result = {
        count: data?.data?.count,
      };
      return tempPersonaData;
    });
    // setShowPersonaSummaryLoader(false);
  } catch (err) {
    // setShowPersonaSummaryLoader(false);
    toast.error("Error fetching block count");
  }
};
export const fetchFilterCount = async ({
  personaData,
  setPersonaData,
  blockId,
  filterId,
  setShowCountLoader,
}: {
  personaData: any;
  setPersonaData: any;
  blockId: number;
  filterId: number;
  setShowCountLoader: any;
}) => {
  try {
    setShowCountLoader(true);
    const { data } = await axios.post(`${API_URL}/filters/count`, {
      persona_filter: {
        ...personaData.blocks[blockId].data.filters[filterId],
      },
    });
    console.log("wallet count", data);

    setPersonaData((prevPersonaData: any) => {
      let tempPersonaData = { ...prevPersonaData };
      tempPersonaData.blocks[blockId].data.filters[filterId].result = {
        count: data?.data?.count,
      };
      return tempPersonaData;
    });
    setShowCountLoader(false);
  } catch (err) {
    setShowCountLoader(false);
    console.log(err);
  }
};

export const fetchCount = async ({
  personaData,
  setPersonaData,
  blockId,
  filterId,
  setShowCountLoader,
  setShowPersonaSummaryLoader,
}: {
  personaData: any;
  setPersonaData: any;
  blockId: any;
  filterId: any;
  setShowCountLoader: any;
  setShowPersonaSummaryLoader: any;
}) => {
  fetchFilterCount({
    personaData,
    setPersonaData,
    blockId,
    filterId,
    setShowCountLoader,
  });
  fetchBlockCount({
    personaData,
    setPersonaData,
    setShowPersonaSummaryLoader,
    blockId,
  });
  fetchPersonaCount({
    personaData,
    setPersonaData,
    setShowPersonaSummaryLoader,
  });
};

export const debounce = (func: any, delay: number) => {
  let debounceTimer: any;
  return function (this: any) {
    const context = this;
    const args = arguments;
    clearTimeout(debounceTimer);
    debounceTimer = setTimeout(() => func.apply(context, args), delay);
  };
};

export const calculateFilterCount = (persona: any) => {
  let count = 0;
  persona.blocks &&
    Object.keys(persona.blocks).forEach((block) => {
      if (persona.blocks[block].data.filters)
        count += Object.keys(persona.blocks[block].data.filters).length;
    });
  return count;
};

export const convertToK = (num: number) => {
  if (num > 999 && num < 1000000) {
    console.log("num", num);
    return (num / 1000).toFixed(1) + "K"; // convert to K for number from > 1000 < 1 million
  } else if (num > 1000000) {
    console.log("num", num);
    return (num / 1000000).toFixed(1) + "M"; // convert to M for number from > 1 million
  } else if (num < 999) {
    console.log("num", num);
    return num; // if value < 1000, nothing to do
  }
};
