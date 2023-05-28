// import { useEffect, useState } from "react";
// import {
//   FormatTime,
//   GetRandomString,
//   calculateStringAccuracy,
// } from "./common/utility";

// const App = () => {
//   const [randomStr, setRandomStr] = useState("");
//   const [inputStr, setInputStr] = useState("");
//   const [data, setData] = useState({
//     accuracy: "NA",
//     keysPressed: 0,
//     timerIsActive: false,
//     interval: undefined,
//     time: 0,
//   });
//   const updateTime = () => {
//     setData((prev) => {
//       return {
//         ...prev,
//         time: prev.time + 1,
//       };
//     });
//   };
//   useEffect(() => {
//     if (data.time === 300) {
//       alert("time up");
//       intervalCleanup();
//     }
//   }, [data.time]);

//   const intervalCleanup = () => {
//     if (data.interval) {
//       clearInterval(data.interval);
//     }
//     const btn = document.getElementById("btn-sub");
//     if (btn) {
//       btn.click();
//     }
//     setData((prev) => {
//       return {
//         ...prev,
//         interval: undefined,
//         time: 0,
//         timerIsActive: false,
//       };
//     });
//   };
//   //
//   useEffect(() => {
//     const str = GetRandomString();
//     setRandomStr(str);

//     //
//     return () => {
//       if (data.interval) {
//         clearInterval(data.interval);
//       }
//     };
//   }, []);

//   const setupInterval = () => {
//     if (!data.interval) {
//       const intervalInstance = setInterval(() => {
//         updateTime();
//       }, 1000);
//       setData((prev) => {
//         return { ...prev, interval: intervalInstance, timerIsActive: true };
//       });
//     }
//   };

//   const handleChange = (event) => {
//     const { value } = event.target;
//     if (value.length === 1 && !data.interval) {
//       setupInterval();
//     }
//     setData((prev) => ({ ...prev, keysPressed: ++prev.keysPressed }));
//     setInputStr(value);
//   };

//   const computeResult = () => {
//     if (randomStr.length !== inputStr.length || !inputStr.length) {
//       alert("Input string length does not match the sample stringe!");
//       return;
//     }
//     const accuracy = calculateStringAccuracy(
//       randomStr,
//       inputStr,
//       randomStr.length
//     );
//     intervalCleanup();
//     setData((prev) => ({ ...prev, accuracy: `${accuracy}%` }));
//   };

//   return (
//     <div className="app">
//       <div className="time">
//         <div> {FormatTime(data.time)}</div>
//         {data.timerIsActive ? <span>Timer of 5 minutes Started</span> : null}
//       </div>
//       <label className="random-string">{randomStr}</label>
//       <div className="wrap">
//         <input
//           className="input-field"
//           value={inputStr}
//           onChange={handleChange}
//           placeholder="Type here..."
//         />
//         <input
//           id="btn-sub"
//           className="submit-btn"
//           type="button"
//           value="Submit"
//           onClick={computeResult}
//         />
//       </div>
//       <div className="result">
//         <label>
//           Accuracy: <span>{data.accuracy}</span>
//         </label>
//         <label>
//           Keys Pressed: <span>{data.keysPressed}</span>
//         </label>
//       </div>
//     </div>
//   );
// };

// export default App;

// { with Redux Code As below}

import { useEffect, useState } from "react";
import {
  FormatTime,
  GetRandomString,
  calculateStringAccuracy,
} from "./common/utility";
import { useDispatch, useSelector } from "react-redux";
import {
  GetAccuracy,
  getInterval,
  getKeyPressed,
  getTime,
  getTimerStatus,
} from "./redux/action";

const App = () => {
  const [randomStr, setRandomStr] = useState("");
  const [inputStr, setInputStr] = useState("");
  const dispatch = useDispatch();

  let { accuracy, keysPressed, timerIsActive, time, interval } = useSelector(
    (store) => {
      return {
        accuracy: store.accuracy,
        keysPressed: store.keysPressed,
        timerIsActive: store.timerIsActive,
        time: store.time,
        interval: store.interval,
      };
    }
  );

  const updateTime = () => {
    dispatch(getTime());
  };
  useEffect(() => {
    if (time === 300) {
      alert("time up");
      intervalCleanup();
    }
  }, [time]);

  const intervalCleanup = () => {
    if (interval) {
      clearInterval(interval);
    }
    const btn = document.getElementById("btn-sub");
    if (btn) {
      btn.click();
    }
    dispatch(getTimerStatus());
  };

  useEffect(() => {
    const str = GetRandomString();
    setRandomStr(str);

    //
    return () => {
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);

  const setupInterval = () => {
    if (!interval) {
      const intervalInstance = setInterval(() => {
        updateTime();
      }, 1000);
      dispatch(getInterval(intervalInstance));
    }
  };

  const handleChange = (event) => {
    const { value } = event.target;
    if (value.length === 1 && !interval) {
      setupInterval();
    }
    dispatch(getKeyPressed());
    setInputStr(value);
  };

  const computeResult = () => {
    if (randomStr.length !== inputStr.length || !inputStr.length) {
      alert("Input string length does not match the sample stringe!");
      return;
    }
    const accuracy = calculateStringAccuracy(
      randomStr,
      inputStr,
      randomStr.length
    );
    intervalCleanup();
    dispatch(GetAccuracy(accuracy));
  };

  return (
    <div className="app">
      <div className="time">
        <div> {FormatTime(time)}</div>
        {timerIsActive ? <span>Timer of 5 minutes Started</span> : null}
      </div>
      <label className="random-string">{randomStr}</label>
      <div className="wrap">
        <input
          className="input-field"
          value={inputStr}
          onChange={handleChange}
          placeholder="Type here..."
        />
        <input
          id="btn-sub"
          className="submit-btn"
          type="button"
          value="Submit"
          onClick={computeResult}
        />
      </div>
      <div className="result">
        <label>
          Accuracy: <span>{accuracy}</span>
        </label>
        <label>
          Keys Pressed: <span>{keysPressed}</span>
        </label>
      </div>
    </div>
  );
};

export default App;
