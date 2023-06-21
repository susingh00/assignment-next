import { TimeRange } from "@/app/lib/component/TimeRange";
import { updateTimeFrame } from "@/app/lib/utils/types/OHLC.type";
import moment from "moment";
import React from "react";

export function OhlcChartFooter({
  updateTimeFrame,
  timeFrame,
}: {
  updateTimeFrame: updateTimeFrame;
  timeFrame: string;
}) {
  return (
    <div className="flex justify-between items-center flex-wrap">
      <TimeRange updateTimeFrame={updateTimeFrame} currentTime={timeFrame} />
      <div className="flex">
        <p className="text-sm text-gray-400">
          {moment().utc().format("hh:mm:ss (UTC)")}
        </p>
        <div
          className="text-gray-400 mx-2"
          style={{ borderLeft: " solid 0.5px", height: "20px" }}
        />
        <p className="text-sm text-gray-400">%</p>
        <p className="text-sm text-gray-400 mx-2">log</p>
        <p className="text-sm">auto</p>
      </div>
    </div>
  );
}
