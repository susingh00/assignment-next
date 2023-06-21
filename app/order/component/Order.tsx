import {
  OrderBookPropsType,
  OrderBookType,
} from "../../lib/utils/types/BookOrder.types";
import Header from "./Header";
import Footer from "./Footer";
import { Label } from "@/app/lib/component/Label";

export const Order = (props: OrderBookPropsType) => {
  return (
    <div>
      <Header />

      <div className="flex justify-center text-center p-10">
        <div className="w-3/6">
          <div className="flex justify-evenly">
            <Label className="text-gray-400" label="COUNT" />
            <Label className="text-gray-400" label="AMOUNT" />
            <Label className="text-gray-400" label="TOTAL" />
            <Label className="text-gray-400" label="PRICE" />
          </div>
          {props.bids.map((bid: OrderBookType, index: number) => (
            <div
              className="flex justify-evenly relative"
              key={index}
              style={{ overflow: "hidden" }}
            >
              <div
                className="green-box"
                style={{ width: (Number(bid.total) * 10) / 3 + "%" }}
              ></div>
              <Label label={bid.count} />
              <Label label={bid.amount} />
              <Label label={Number(bid.total).toFixed(4)} />
              <Label label={bid.price.toLocaleString()} />
            </div>
          ))}
        </div>
        <div className="w-3/6">
          <div className="flex justify-evenly">
            <Label className="text-gray-400" label="PRICE" />
            <Label className="text-gray-400" label="TOTAL" />
            <Label className="text-gray-400" label="AMOUNT" />
            <Label className="text-gray-400" label="COUNT" />
          </div>
          {props.asks.map((ask: OrderBookType, index: number) => (
            <div
              className="flex justify-evenly relative"
              key={index}
              style={{ overflow: "hidden" }}
            >
              <div
                className="red-box"
                style={{ width: (Number(ask.total) * 10) / 3 + "%" }}
              ></div>
              <Label label={ask.price.toLocaleString()} />
              <Label label={Number(ask.total).toFixed(4)} />
              <Label label={ask.amount} />
              <Label label={ask.count} />
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};
