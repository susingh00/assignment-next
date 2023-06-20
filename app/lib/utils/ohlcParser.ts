import { subtractTimeType } from "./types/constant.type";
import { series as constant, EPOCH_TIME } from "./constant";
import { seriesType } from "./types/OHLC.type";
export const getTimeFrame = (time: string) => {
  let timeFrame: subtractTimeType = { num: 1, time: "hour" };
  switch (time) {
    case "6h":
      timeFrame.num = 6;
      break;
    case "1d":
      timeFrame.num = 1;
      timeFrame.time = "day";
      break;
    case "3d":
      timeFrame.num = 3;
      timeFrame.time = "day";
      break;
    case "7d":
      timeFrame.num = 7;
      timeFrame.time = "day";
      break;
    case "1m":
      timeFrame.num = 1;
      timeFrame.time = "month";
      break;
    case "3m":
      timeFrame.num = 3;
      timeFrame.time = "month";
      break;
    case "1y":
      timeFrame.num = 1;
      timeFrame.time = "year";
      break;
    case "3y":
      timeFrame.num = 3;
      timeFrame.time = "year";
      break;
  }
  return timeFrame;
};
export const chartParser = (data: [] | any, timeStamp: number) => {
  let mappedArr: seriesType = [];
  timeStamp = data[constant.MTS];
  mappedArr = [];
  mappedArr.push(timeStamp);
  let value = data.slice(1, 5);
  const high = value[constant.HIGH];
  const low = value[constant.LOW];
  const close = value[constant.CLOSE];
  value[constant.CLOSE] = high;
  value[constant.HIGH] = low;
  value[constant.LOW] = close;
  mappedArr.push(value);
  return mappedArr;
};
