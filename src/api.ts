import axios from "axios";

export const api = (url: string, data: any) =>
  axios
    .post(`${url}/URWAYPGService/transaction/jsonProcess/JSONrequest`, data)
    .then((response) => response.data);
