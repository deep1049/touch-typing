import { legacy_createStore } from "redux";
import { reducer } from "./reducer";

let initalState = {
  accuracy: "NA",
  keysPressed: 0,
  timerIsActive: false,
  interval: undefined,
  time: 0,
};
export const store = legacy_createStore(reducer, initalState);
