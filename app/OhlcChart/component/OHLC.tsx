import { useEffect, useState } from "react";
import { Chart } from "../../lib/component/Chart";
import moment from "moment";
import { routes } from "../../lib/utils/routes";
import { epochTime, series } from "../../lib/utils/constant";
import { OHLCType, fecthCandle } from "../../lib/utils/types/OHLC.type";
import Link from "next/link";
import Tools from "@/app/lib/component/Tools";

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
        <div className="flex justify-between px-2">
          <div>
            <div className="flex">
              <button className="p-2">
                <p className="text-sm text-gray-400">
                  {epochTime[props.timeFrame].timeFrame}
                </p>
              </button>
              <button className="p-2">
                <span className="text-sm text-gray-400">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 28 28"
                    width="28"
                    height="28"
                    fill="currentColor"
                  >
                    <path d="M17 11v6h3v-6h-3zm-.5-1h4a.5.5 0 0 1 .5.5v7a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-7a.5.5 0 0 1 .5-.5z"></path>
                    <path d="M18 7h1v3.5h-1zm0 10.5h1V21h-1z"></path>
                    <path d="M9 8v12h3V8H9zm-.5-1h4a.5.5 0 0 1 .5.5v13a.5.5 0 0 1-.5.5h-4a.5.5 0 0 1-.5-.5v-13a.5.5 0 0 1 .5-.5z"></path>
                    <path d="M10 4h1v3.5h-1zm0 16.5h1V24h-1z"></path>
                  </svg>
                </span>
              </button>
              <button className="p-2">
                <p className="text-sm  text-gray-400">Indicators</p>{" "}
              </button>
            </div>
            <PriceAction currentPrice={currentPrice} />
          </div>
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
        BTC/USD 30 Bitfinex <span className="text-gray-400 mx-1">O</span>
        <span className="text-green-600" id="price-action">
          {currentPrice[series.OPEN]}
        </span>
        <span className="text-gray-400 mx-1">H</span>
        <span className="text-green-600" id="price-action">
          {currentPrice[series.HIGH]}
        </span>
        <span className="text-gray-400 mx-1">L</span>
        <span className="text-green-600" id="price-action">
          {currentPrice[series.LOW]}
        </span>
        <span className="text-gray-400 mx-1">C</span>
        <span className="text-green-600" id="price-action">
          {currentPrice[series.CLOSE]}
        </span>
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
