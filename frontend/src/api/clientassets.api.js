import axios from "axios";


export const createClientAssetRequest = async (clientAsset) =>
  await axios.post("http://127.0.01:4000/api/client-assets", clientAsset);
