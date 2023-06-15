import { useEffect, useState } from "react";
import { OHLC } from "./component/OHLC";
import { socket_url } from "../lib/utils/socket";
import useWebSocket from "react-use-websocket";
import { series as constant, epochTime } from "../lib/utils/constant";
import moment from "moment";
import { apiCall } from "../lib/utils/apiCall";
import { endpoint } from "../lib/utils/endPoints";
import { seriesType } from "../lib/utils/types/OHLC.type";
import { chartParser, getTimeFrame } from "../lib/utils/ohlcParser";
import { Loader } from "../lib/component/Loader";
export const OhlcChart = () => {
  const [series, setSeries] = useState<number[]>([]);
  const [timeFrame, setTimeFrame] = useState("1h");
  const ws = useWebSocket(socket_url, {
    onOpen: () => console.log("opened"),
    shouldReconnect: () => true,
    onMessage: (_msg) => {
      ohlcParser();
    },
  });
  useEffect(() => {
    fecthCandle("1h");
    handleTimeFrame("");
  }, []);
  const fecthCandle = async (time: string) => {
    try {
      setTimeFrame(time);
      const subtractTime = getTimeFrame(time);
      const startTime = moment()
        .utc()
        .subtract(subtractTime.num, subtractTime.time)
        .valueOf();

      const endTime = moment().utc().valueOf();
      const { limit, timeFrame: tradeTime } = epochTime[time];
      const path = `${endpoint.candles}:${tradeTime}:tBTCUSD/hist?start=${startTime}&end=${endTime}`;
      const res = await apiCall("GET", path);
      if (res.status === 200) {
        let timeStamp: number,
          final: number[] = [];
        res.data.map((item: number[]) => {
          timeStamp = item[constant.MTS];
          const mappedData = chartParser(item, timeStamp);
          final.push(mappedData);
        });
        setSeries([...final]);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const ohlcParser = () => {
    if (ws.lastJsonMessage?.length && timeFrame === "1h") {
      let timeStamp: number;
      let eventData = ws.lastJsonMessage;
      let data: [] | any = eventData ?? eventData;
      data = data[constant.DATA];
      if (data.length === 6) {
        timeStamp = data[constant.MTS];
        const mappedData = chartParser(data, timeStamp);
        setSeries((prev) => [...prev, mappedData]);
      }
    }
  };

  const handleTimeFrame = (time: string) => {
    let msg = {
      event: "subscribe",
      channel: "candles",
      // key: `trade:${time}:tBTCUSD`,
      key: `trade:1m:tBTCUSD`,
    };
    ws.sendJsonMessage(msg);
  };
  return series.length ? (
    <OHLC series={series} fecthCandle={fecthCandle} timeFrame={timeFrame} />
  ) : (
    <Loader />
  );
};
