import axios from "axios";
import { DEPLOYMENT_ENV } from "./constants";

const dgmApi = axios.create({
  baseURL: `https://${DEPLOYMENT_ENV === "mainnet" ? "api" : "dev-api"}.degenmarkets.com`,
});

type UploadImagePayload = {
  image: string;
  title: string;
  signature: string;
};

export const uploadImage = (uploadImagePayload: UploadImagePayload) =>
  dgmApi.post<{ imageUrl: string }>(`/admin/upload-image`, uploadImagePayload);

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
    const res = await dgmApi.get<PoolsResponse>(`/pools`);
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
    const res = await dgmApi.get<OptionsResponse>(
      `/options?pool=${poolAddress}`,
    );
    return res.data;
  } catch (error) {
    console.error(error);
    window.alert("Could not fetch options");
    throw new Error("Could not fetch options");
  }
};

export const deletePool = async ({
  poolAddress,
  signature,
}: {
  poolAddress: string;
  signature: string;
}): Promise<void> => {
  try {
    await dgmApi.post(`/admin/delete-pool`, { poolAddress, signature });
  } catch (error) {
    console.error("Failed to delete pool:", error);
    throw new Error("Could not delete pool");
  }
};
