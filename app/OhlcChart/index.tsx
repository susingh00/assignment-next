import { useEffect, useState } from "react";
import { OHLC } from "./component/OHLC";
import { socket_url } from "../lib/utils/socket";
import useWebSocket from "react-use-websocket";
import { series as constant, epochTime } from "../lib/utils/constant";
import moment from "moment";
import { apiCall } from "../lib/utils/apiCall";
import { endpoint } from "../lib/utils/endPoints";
import { seriesType } from "../lib/utils/types/OHLC.type";
import { subtractTimeType } from "../lib/utils/types/constant.type";
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
      let subtractTime: subtractTimeType = { num: 1, time: "hour" };
      setTimeFrame(time);
      switch (time) {
        case "6h":
          subtractTime.num = 6;
          break;
        case "1d":
          subtractTime.num = 1;
          subtractTime.time = "day";
          break;
        case "3d":
          subtractTime.num = 3;
          subtractTime.time = "day";
          break;
        case "7d":
          subtractTime.num = 7;
          subtractTime.time = "day";
          break;
        case "1m":
          subtractTime.num = 1;
          subtractTime.time = "month";
          break;
        case "3m":
          subtractTime.num = 3;
          subtractTime.time = "month";
          break;
        case "1y":
          subtractTime.num = 1;
          subtractTime.time = "year";
          break;
        case "3y":
          subtractTime.num = 3;
          subtractTime.time = "year";
          break;
        default:
          break;
      }
      const startTime = moment()
        .utc()
        .subtract(subtractTime.num, subtractTime.time)
        .valueOf();

      const endTime = moment().utc().valueOf();
      const limit = epochTime[time].limit;
      const tradeTime = epochTime[time].timeFrame;
      const path = `${endpoint.candles}:${tradeTime}:tBTCUSD/hist?start=${startTime}&end=${endTime}&limit=${limit}`;
      const res = await apiCall("GET", path);
      if (res.status === 200) {
        let timeStamp: number,
          mappedArr: seriesType,
          final: number[] = [];
        res.data.map((item: number[]) => {
          timeStamp = item[constant.MTS];
          mappedArr = [];
          mappedArr.push(timeStamp);
          let value = item.slice(1, 5);
          const high = value[constant.HIGH];
          const low = value[constant.LOW];
          const close = value[constant.CLOSE];
          value[constant.CLOSE] = high;
          value[constant.HIGH] = low;
          value[constant.LOW] = close;
          mappedArr.push(value);
          final.push(mappedArr);
        });
        setSeries([...final]);
        // handleTimeFrame(epochTime[time].timeFrame);
      }
    } catch (error) {
      console.log("error: ", error);
    }
  };
  const ohlcParser = () => {
    if (ws.lastJsonMessage?.length) {
      let timeStamp, mappedArr: seriesType;
      let eventData = ws.lastJsonMessage;
      let data: [] | any = eventData ?? eventData;
      data = data[constant.DATA];
      console.log("data: ", data);
      if (data.length === 6) {
        timeStamp = data[constant.MTS];
        mappedArr = [];
        mappedArr.push(timeStamp);
        let value = data.slice(1, 5);
        const high = value[constant.HIGH];
        const low = value[constant.LOW];
        const close = value[constant.CLOSE];
        value[constant.CLOSE] = high;
        value[constant.HIGH] = low;
        value[constant.LOW] = close;
        mappedArr.push(value);
        setSeries((prev) => [...prev, mappedArr]);
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
  ) : null;
};
