import { useEffect, useState } from "react";
import { OhlcCompoent } from "./component/OhlcComponent";
import { candleParser } from "../lib/utils/ohlcParser";
import { Loader } from "../lib/component/Loader";
import { candleService } from "./service/Candle";
import { CandleSeriesType } from "../lib/utils/types/OHLC.type";

const ONE_HOUR = "1h";

export const OhlcPage = () => {
  const [series, setSeries] = useState<CandleSeriesType>([]);
  const [timeFrame, setTimeFrame] = useState(ONE_HOUR);

  useEffect(() => {
    fetchCandle(timeFrame);
  }, [timeFrame]);
  const updateTimeFrame = (time: string) => {
    setTimeFrame(time);
  };
  const fetchCandle = async (time: string) => {
    const { data, error } = await candleService(time);

    if (!error) {
      const candleData = candleParser(data);
      setSeries([...candleData]);
    } else {
      alert(error);
      console.log("error: ", error);
    }
  };

  return series.length ? (
    <OhlcCompoent
      series={series}
      updateTimeFrame={updateTimeFrame}
      timeFrame={timeFrame}
    />
  ) : (
    <Loader />
  );
};
