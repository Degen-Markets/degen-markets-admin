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

type PoolResponse = {
  address: string;
  title: string;
  description: string;
  image: `https://${string}`;
  isPaused: boolean;
}[];
export const fetchPools = async (): Promise<PoolResponse> => {
  try {
    const res = await axios.get<PoolResponse>(`${baseUrl}/pools`);
    return res.data;
  } catch (error) {
    console.error(error);
    window.alert("Could not fetch pools");
    throw new Error("Could not fetch pools"); // stop further execution
  }
};

type OptionResponse = {
  address: string;
  title: string;
}[];

export const fetchOptions = async (
  poolAddress: string,
): Promise<OptionResponse> => {
  try {
    const res = await axios.get<OptionResponse>(
      `${baseUrl}/options?pool=${poolAddress}`,
    );
    return res.data;
  } catch (error) {
    console.error(error);
    window.alert("Could not fetch options");
    throw new Error("Could not fetch options");
  }
};
