import { getRequest } from "./http";

export const getAssets = async (params) =>
  (await getRequest("/assets", params)).data;
