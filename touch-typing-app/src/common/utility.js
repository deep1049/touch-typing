import moment from "moment";

export const GetRandomString = () => {
  let stringLength = 20;
  let alphabetsAllowed = [" ", "a", "s", "d", "f", "j", "k", "l", ";"];

  let generatedString = "";
  for (let i = 0; i < stringLength; i++) {
    let currentNumber = GetRandomNumber();

    if (
      (currentNumber === 0 && i === 0) ||
      (currentNumber === 0 && i === stringLength - 1)
    ) {
      currentNumber = 1;
    }

    generatedString += alphabetsAllowed[currentNumber];
  }
  return generatedString;
};

const GetRandomNumber = () => {
  return Math.floor(Math.random() * 8);
};

export const calculateStringAccuracy = (s1 = "", s2 = "", loopLength) => {
  let longString = "";
  let shortString = "";
  if (s1.length > s2.length) {
    longString = s1;
    shortString = s2;
  } else {
    longString = s2;
    shortString = s1;
  }
  let matchCount = 0;
  //   console.log("abc", s1, s2);
  for (let i = 0; i < loopLength; i++) {
    if (longString.charAt(i) === shortString.charAt(i)) {
      ++matchCount;
    }
  }
  let accuracy = (matchCount / longString.length) * 100;
  return accuracy;
};

export const FormatTime = (secondsTime) => {
  return moment.utc(secondsTime * 1000).format("HH:mm:ss");
};
