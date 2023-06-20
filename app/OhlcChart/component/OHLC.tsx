import { useEffect, useState } from "react";
import { Chart } from "../../lib/component/Chart";
import moment from "moment";
import { routes } from "../../lib/utils/routes";
import { series } from "../../lib/utils/constant";
import { OHLCType, fetchCandle } from "../../lib/utils/types/OHLC.type";
import Link from "next/link";
import Tools from "@/app/lib/component/Tools";
import { IndicatorBar } from "@/app/lib/component/IndicatorBar";
import { PriceAction } from "@/app/lib/component/PriceAction";
import { TimeRange } from "@/app/lib/component/TimeRange";

export function OHLC(props: OHLCType) {
  const [currentPrice, setcurrentPrice] = useState<Array<number>>(
    props.series[props.series.length - 1][series.DATA]
  );
  useEffect(() => {
    setcurrentPrice(props.series[props.series.length - 1][series.DATA]);
  }, [props.series]);
  return (
    <div>
      <Header />
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
            <Chart series={props.series} />

            <Footer
              fetchCandle={props.fetchCandle}
              timeFrame={props.timeFrame}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

const Footer = ({
  fetchCandle,
  timeFrame,
}: {
  fetchCandle: fetchCandle;
  timeFrame: string;
}) => {
  return (
    <div className="flex justify-between items-center flex-wrap">
      <TimeRange fetchCandle={fetchCandle} currentTime={timeFrame} />
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
};
const Header = () => {
  return (
    <div className="flex justify-between p-2 border-gray-400 border-b-2">
      <h3>
        CHART <span className="text-gray-400">BTC/USD</span>
      </h3>
      <div className="flex items-center">
        <input type="checkbox" className="mr-2" checked={true} />
        <p className="max-[500px]:hidden text-gray-400 text-sm">
          SHOW LIQUIDATIONS
        </p>
        <i className="fa-solid fa-arrows-rotate text-gray-200 ms-2 text-sm"></i>
        <Link className="mx-2 border-2 px-2 rounded" href={routes.ORDER_BOOK}>
          Book Order&apos;s
        </Link>
      </div>
    </div>
  );
};
