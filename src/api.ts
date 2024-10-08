import axios from "axios";

export const baseUrl = "https://api.degenmarkets.com/";

type UploadImagePayload = {
  image: string;
  title: string;
  signature: string;
};

export const uploadImage = (uploadImagePayload: UploadImagePayload) =>
  axios.post<{ imageUrl: string }>(
    `${baseUrl}/upload-image`,
    uploadImagePayload,
  );

export type Pool = {
  address: string;
  title: string;
  description: string;
  image: `https://${string}`;
  isPaused: boolean;
};

type PoolsResponse = Pool[];

export const fetchPools = async (): Promise<PoolsResponse> => {
  try {
    const res = await axios.get<PoolsResponse>(`${baseUrl}/pools`);
    return res.data;
  } catch (error) {
    console.error(error);
    window.alert("Could not fetch pools");
    throw new Error("Could not fetch pools"); // stop further execution
  }
};

type OptionsResponse = {
  address: string;
  pool: string;
  title: string;
  value: string;
  isWinningOption: boolean;
}[];

export const fetchOptions = async (
  poolAddress: string,
): Promise<OptionsResponse> => {
  try {
    const res = await axios.get<OptionsResponse>(
      `${baseUrl}/options?pool=${poolAddress}`,
    );
    return res.data;
  } catch (error) {
    console.error(error);
    window.alert("Could not fetch options");
    throw new Error("Could not fetch options");
  }
};
