import { Dispatch, SetStateAction } from "react";

export type CandleSeriesType = (number | number[])[][];
export type setTimeFrame = Dispatch<SetStateAction<string>>;
export interface OHLCType {
  series: CandleSeriesType;
  timeFrame: string;
  setTimeFrame: setTimeFrame;
}
