import { epochTimeType } from "./types/constant.type";

export const orderBook = {
  PRICE: 0,
  COUNT: 1,
  AMOUNT: 2,
  DATA: 1,
};
export const series = {
  DATA: 1,
  MTS: 0,
  OPEN: 0,
  CLOSE: 1,
  HIGH: 2,
  LOW: 3,
};
export const epochTime: epochTimeType = {
  "1h": {
    timeFrame: "1m",
    limit: 330,
  },
  "6h": {
    timeFrame: "5m",
    limit: 330,
  },
  "1d": {
    timeFrame: "15m",
    limit: 330,
  },
  "3d": {
    timeFrame: "30m",
    limit: 330,
  },
  "7d": {
    timeFrame: "1h",
    limit: 330,
  },
  "1m": {
    timeFrame: "6h",
    limit: 330,
  },
  "3m": {
    timeFrame: "12h",
    limit: 330,
  },
  "1y": {
    timeFrame: "1D",
    limit: 330,
  },
  "3y": {
    timeFrame: "1W",
    limit: 330,
  },
};
export const ohlc = {
  open: 0,
  high: 1,
  low: 2,
  close: 3,
};
