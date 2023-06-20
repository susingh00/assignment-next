export type seriesType = number[] | any;
export type fetchCandle = (time: string) => Promise<void>;
export interface OHLCType {
  series: seriesType;
  timeFrame: string;
  fetchCandle: fetchCandle;
}
