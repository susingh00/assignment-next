export type CandleSeriesType = (number | number[])[][];
export type updateTimeFrame = (time: string) => void;
export interface OHLCType {
  series: CandleSeriesType;
  timeFrame: string;
  updateTimeFrame: updateTimeFrame;
}
