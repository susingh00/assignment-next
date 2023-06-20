import { useEffect, useState } from "react";
import { OHLC } from "./component/OHLC";
import { series as constant } from "../lib/utils/constant";
import { chartParser } from "../lib/utils/ohlcParser";
import { Loader } from "../lib/component/Loader";
import { candleService } from "./service/Candle";

export const OhlcChart = () => {
  const oneHr = "1h";
  const [series, setSeries] = useState<number[]>([]);
  const [timeFrame, setTimeFrame] = useState(oneHr);

  useEffect(() => {
    fetchCandle(oneHr);
  }, []);
  useEffect(() => {
    if (timeFrame === oneHr) {
      setInterval(() => fetchCandle(oneHr), 100000);
    }
  });

  const fetchCandle = async (time: string) => {
    setTimeFrame(time);

    const { data, error } = await candleService(time);

    if (data) {
      const final = data.map((item: number[]) => {
        const timeStamp = item[constant.MTS];
        const mappedData = chartParser(item, timeStamp);
        return mappedData;
      });
      setSeries([...final]);
    } else {
      alert(error);
      console.log("error: ", error);
    }
  };

  return series.length ? (
    <OHLC series={series} fetchCandle={fetchCandle} timeFrame={timeFrame} />
  ) : (
    <Loader />
  );
};
