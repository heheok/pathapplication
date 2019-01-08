import axios from "axios";
import { createStore, applyMiddleware } from "redux";
import axiosMiddleware from "redux-axios-middleware";
import reducer from "./reducers";

const client = axios.create({
  baseURL: "http://localhost:3000",
  responseType: "json"
});

export default createStore(reducer, applyMiddleware(axiosMiddleware(client)));
