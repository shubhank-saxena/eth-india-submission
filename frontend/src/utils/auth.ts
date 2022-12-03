import axios from "axios";
import { API_URL } from "../../constants";

export const getNonce = async (wallet_address: string) => {
  try {
    const res = await axios.post(`${API_URL}/get-nonce`, {
      wallet_address: wallet_address,
    });

    return res.data.nonce;
  } catch (err) {
    console.log(err);
  }
};

export const verifySignature = async (
  wallet_address: string,
  signature: string
) => {
  try {
    const res = await axios.post(`${API_URL}/verifysignature`, {
      wallet_address: wallet_address,
      signature: signature,
    });
    localStorage.setItem("access_token", res.data.access);
    localStorage.setItem("refresh_token", res.data.refresh);
    return true;
  } catch (err) {
    console.log(err);
  }
};

export const verifyAccessToken = async (
  accessToken: string,
  address: string
) => {
  try {
    const res = await axios.get(
      `${API_URL}/check-auth?wallet_address=${address}&jwt_token=${accessToken}`
    );
    if (res?.data?.data?.token_expired != undefined)
      return res?.data?.data?.token_expired;
    else return true;
  } catch (err) {
    console.log(err);
    return true;
    // throw err;
  }
};
