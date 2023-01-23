import axios from "axios";
import type { AxiosResponse } from "axios";
export const api = (url: string, data: any) =>
  axios
    .post(`${url}/URWAYPGService/transaction/jsonProcess/JSONrequest`, data)
    .then((response: AxiosResponse) => response.data);
