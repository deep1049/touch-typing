import {
  GET_ACCURACY,
  GET_TIME,
  GET_INTERVAL,
  GET_KEY_PRESSED,
  GET_TIMER_STATUS,
} from "./actionTypes";

export const GetAccuracy = (payload) => {
  return { type: GET_ACCURACY, payload };
};
export const getTime = () => {
  return { type: GET_TIME };
};
export const getInterval = (payload) => {
  return { type: GET_INTERVAL, payload };
};
export const getKeyPressed = () => {
  return { type: GET_KEY_PRESSED };
};
export const getTimerStatus = () => {
  return { type: GET_TIMER_STATUS };
};
