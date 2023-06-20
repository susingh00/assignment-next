import { CANDLE_SERIES } from "../utils/constant";
import { CandlePrice } from "./CandlePrice";

export const PriceAction = ({ currentPrice }: { currentPrice: number[] }) => {
  return (
    <div>
      <h5>
        BTC/USD 30 Bitfinex
        <CandlePrice
          label={"O"}
          currentPrice={currentPrice[CANDLE_SERIES.OPEN]}
        />
        <CandlePrice
          label={"H"}
          currentPrice={currentPrice[CANDLE_SERIES.HIGH]}
        />
        <CandlePrice
          label={"L"}
          currentPrice={currentPrice[CANDLE_SERIES.LOW]}
        />
        <CandlePrice
          label={"C"}
          currentPrice={currentPrice[CANDLE_SERIES.CLOSE]}
        />
      </h5>
    </div>
  );
};
