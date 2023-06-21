import { SubtractTimeType } from "./types/constant.type";
export const getTimeFrame = (time: string) => {
  let timeFrame: SubtractTimeType = { num: 1, time: "hour" };
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
export const candleParser = (data: number[][]) => {
  return data.map((unParseData: number[]) => {
    const [timeStamp, open, close, high, low] = unParseData;
    return [timeStamp, [open, high, low, close]];
  });
};
