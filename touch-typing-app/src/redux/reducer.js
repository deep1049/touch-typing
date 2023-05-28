import {
  GET_ACCURACY,
  GET_INTERVAL,
  GET_KEY_PRESSED,
  GET_TIME,
  GET_TIMER_STATUS,
} from "./actionTypes";

export const reducer = (state, action) => {
  switch (action.type) {
    case GET_ACCURACY:
      return { ...state, accuracy: `${action.payload}%` };
    case GET_INTERVAL:
      return { ...state, interval: action.payload, timerIsActive: true };
    case GET_KEY_PRESSED:
      return { ...state, keysPressed: state.keysPressed + 1 };
    case GET_TIME:
      return {
        ...state,
        time: state.time + 1,
      };
    case GET_TIMER_STATUS:
      return {
        ...state,
        interval: undefined,
        time: 0,
        timerIsActive: false,
      };
    default:
      return state;
  }
};
