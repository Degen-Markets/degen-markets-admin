import axios from "axios";

export const baseUrl = 'https://api.degenmarkets.com/';

type UploadImagePayload = {
  image: string;
  title: string;
  signature: string;
};

export const uploadImage = (uploadImagePayload: UploadImagePayload) => axios.post<{imageUrl: string}>(`${baseUrl}/upload-image`, uploadImagePayload);