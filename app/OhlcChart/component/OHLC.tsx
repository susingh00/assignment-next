import { useEffect, useState } from "react";
import { Chart } from "../../lib/component/Chart";
import moment from "moment";
import { routes } from "../../lib/utils/routes";
import { epochTime, series } from "../../lib/utils/constant";
import { OHLCType, fecthCandle } from "../../lib/utils/types/OHLC.type";
import Link from "next/link";
import Tools from "@/app/lib/component/Tools";
import { CandlePrice } from "@/app/lib/component/CandlePrice";
import { IndicatorBar } from "@/app/lib/component/IndicatorBar";

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
              fecthCandle={props.fecthCandle}
              timeFrame={props.timeFrame}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
const PriceAction = ({ currentPrice }: { currentPrice: number[] }) => {
  return (
    <div>
      <h5>
        BTC/USD 30 Bitfinex
        <CandlePrice label={"O"} currentPrice={currentPrice[series.OPEN]} />
        <CandlePrice label={"H"} currentPrice={currentPrice[series.HIGH]} />
        <CandlePrice label={"L"} currentPrice={currentPrice[series.LOW]} />
        <CandlePrice label={"C"} currentPrice={currentPrice[series.CLOSE]} />
      </h5>
    </div>
  );
};
const TimeRange = ({
  fecthCandle,
  timeFrame,
}: {
  fecthCandle: fecthCandle;
  timeFrame: string;
}) => {
  return (
    <div>
      {Object.keys(epochTime).map((time, index) => (
        <button className="p-2" onClick={() => fecthCandle(time)} key={index}>
          <p
            className={`text-sm ${
              timeFrame === time ? "text-white" : "text-gray-400"
            }`}
          >
            {time}
          </p>
        </button>
      ))}
    </div>
  );
};
const Footer = ({
  fecthCandle,
  timeFrame,
}: {
  fecthCandle: fecthCandle;
  timeFrame: string;
}) => {
  return (
    <div className="flex justify-between items-center flex-wrap">
      <TimeRange fecthCandle={fecthCandle} timeFrame={timeFrame} />
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
        <Link className="mx-2 border-2 px-2 rounded" href={routes.orderBook}>
          Book Order&apos;s
        </Link>
      </div>
    </div>
  );
};
