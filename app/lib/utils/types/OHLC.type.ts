export type seriesType = number[] | any;
export type fecthCandle = (time: string) => Promise<void>;
export interface OHLCType {
  series: seriesType;
  timeFrame: string;
  fecthCandle: fecthCandle;
}
