import Link from "next/link";
import { routes } from "../../lib/utils/routes";
import {
  BookOrderPropsType,
  BookOrderType,
} from "../../lib/utils/types/BookOrder.types";
import Header from "./Header";
import Footer from "./Footer";

export const Order = (props: BookOrderPropsType) => {
  return (
    <div>
      <Header />

      <div className="flex justify-center text-center p-10">
        <div className="w-3/6">
          <div className="flex justify-evenly">
            <p className="text-gray-400 w-2">COUNT</p>
            <p className="text-gray-400 w-2">AMOUNT</p>
            <p className="text-gray-400 w-2">TOTAL</p>
            <p className="text-gray-400 w-2">PRICE</p>
          </div>
          {props.bids.map((bid: BookOrderType, index: number) => (
            <div
              className="flex justify-evenly relative"
              key={index}
              style={{ overflow: "hidden" }}
            >
              <div
                className="green-box"
                style={{ width: (Number(bid.total) * 10) / 3 + "%" }}
              ></div>
              <p className="w-2">{bid.count}</p>
              <p className="w-2">{bid.amount}</p>
              <p className="w-2">{Number(bid.total).toFixed(4)}</p>
              <p className="w-2">{bid.price.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="w-3/6">
          <div className="flex justify-evenly">
            <p className="text-gray-400 w-2">PRICE</p>
            <p className="text-gray-400 w-2">TOTAL</p>
            <p className="text-gray-400 w-2">AMOUNT</p>
            <p className="text-gray-400 w-2">COUNT</p>
          </div>
          {props.asks.map((ask: BookOrderType, index: number) => (
            <div
              className="flex justify-evenly relative"
              key={index}
              style={{ overflow: "hidden" }}
            >
              <div
                className="red-box"
                style={{ width: (Number(ask.total) * 10) / 3 + "%" }}
              ></div>
              <p className="w-2">{ask.price.toLocaleString()}</p>
              <p className="w-2">{Number(ask.total).toFixed(4)}</p>
              <p className="w-2">{ask.amount}</p>
              <p className="w-2">{ask.count}</p>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  );
};
