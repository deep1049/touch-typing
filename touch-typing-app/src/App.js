import { useEffect, useState } from "react";
import {
  FormatTime,
  GetRandomString,
  calculateStringAccuracy,
} from "./common/utility";

const App = () => {
  const [randomStr, setRandomStr] = useState("");
  const [inputStr, setInputStr] = useState("");
  const [result, setResult] = useState({
    accuracy: "NA",
  });
  let [time, setTime] = useState(0);
  let interval = undefined;
  useEffect(() => {
    //console.log(`init timer`);
    interval = setInterval(() => {
      updateTime();
    }, 1000);

    return () => {
      console.log(`clear time interval`);
      if (interval) {
        clearInterval(interval);
      }
    };
  }, []);
  const updateTime = () => {
    setTime((prev) => {
      if (prev === 10) {
        alert("time up");
        if (interval) {
          clearInterval(interval);
        }
        const btn = document.getElementById("btn-sub");
        if (btn) {
          btn.click();
        }
      }
      return prev + 1;
    });
  };
  //
  useEffect(() => {
    const str = GetRandomString();
    setRandomStr(str);
  }, []);

  const handleChange = (event) => {
    const { value } = event.target;
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
    // console.log(accuracy);
    setResult((prev) => ({ ...prev, accuracy: `${accuracy}%` }));
  };

  return (
    <div className="app">
      <div className="time">
        <div> {FormatTime(time)}</div>
        <span>Timer of 5 minutes Started</span>
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
          Accuracy: <span>{result.accuracy}</span>
        </label>
      </div>
    </div>
  );
};

export default App;
