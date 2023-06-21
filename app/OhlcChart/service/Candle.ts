import { apiCall } from "@/app/lib/utils/apiCall";
import { EPOCH_TIME } from "@/app/lib/utils/constant";
import { endpoint } from "@/app/lib/utils/endPoints";
import { getTimeFrame } from "@/app/lib/utils/ohlcParser";
import moment from "moment";
import * as querystring from "querystring";
export const candleService = async (time: string) => {
  const subtractTime = getTimeFrame(time);

  const startTime = moment()
    .utc()
    .subtract(subtractTime.num, subtractTime.time)
    .valueOf();

  const endTime = moment().utc().valueOf();

  const { timeFrame } = EPOCH_TIME[time];

  const params = {
    start: startTime,
    end: endTime,
  };

  const queryPath = querystring.stringify(params);

  const path = `${endpoint.candles}:${timeFrame}:tBTCUSD/hist?${queryPath}`;

  const { data, error } = await apiCall("GET", path);
  return { data, error };
};
