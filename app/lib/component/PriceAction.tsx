import { series } from "../utils/constant";
import { CandlePrice } from "./CandlePrice";

export const PriceAction = ({ currentPrice }: { currentPrice: number[] }) => {
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
