import axios from "axios";

const api = axios.create({
  baseURL: "https://blend-house-backend.vercel.app"
  // baseURL: "http://192.168.1.64:3333"

});


export { api };