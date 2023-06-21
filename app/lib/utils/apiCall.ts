import axios from "axios";
const baseURL = "https://api-pub.bitfinex.com";
export const apiCall = async (
  method: string,
  endpoint: string,
  params?: Object
) => {
  try {
    const res = await axios({
      method,
      url: `${baseURL}${endpoint}`,
      data: params,
    });
    if (res.status === 200) {
      return { data: res.data, error: null };
    }
  } catch (error) {
    return { error: "Something went worng", data: null };
  }
  return { data: null, error: null };
};
