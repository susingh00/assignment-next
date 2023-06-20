import { DurationInputArg1, DurationInputArg2 } from "moment";

interface TradeTime {
  timeFrame: string;
  limit: number;
}
export interface EpochTimeType {
  [name: string]: TradeTime;
}
export interface SubtractTimeType {
  num: DurationInputArg1;
  time: DurationInputArg2;
}
