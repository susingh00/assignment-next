import { useMemo, useState } from "react";
import { CandleChart } from "../../lib/component/CandleChart";
import { CANDLE_SERIES } from "../../lib/utils/constant";
import { OHLCType } from "../../lib/utils/types/OHLC.type";
import Tools from "@/app/lib/component/Tools";
import { IndicatorBar } from "@/app/lib/component/IndicatorBar";
import { PriceAction } from "@/app/lib/component/PriceAction";
import { OhlcChartFooter } from "./OhlcChartFooter";
import { OhlcChartHeader } from "./OhlcChartHeader";

export function OhlcCompoent(props: OHLCType) {
  const [currentPrice, setcurrentPrice] = useState<number[]>([]);
  useMemo(() => {
    const candleSeriesLen = props.series[props.series.length - 1];
    const candleSeriesData = candleSeriesLen[
      CANDLE_SERIES.DATA_INDEX
    ] as number[];
    setcurrentPrice(candleSeriesData);
  }, [props.series]);
  return (
    <div>
      <OhlcChartHeader />
      <div className="p-2">
        <div className="px-2">
          <IndicatorBar time={props.timeFrame} />

          <PriceAction currentPrice={currentPrice} />
        </div>
        <div className="flex">
          <div
            style={{
              flex: "0.05",
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-evenly",
            }}
          >
            <Tools />
          </div>
          <div style={{ flex: "0.95" }}>
            <CandleChart series={props.series} />

            <OhlcChartFooter
              updateTimeFrame={props.updateTimeFrame}
              timeFrame={props.timeFrame}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
