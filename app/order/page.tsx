"use client";
import { Order } from "./component/Order";
import { useOrderBook } from "../lib/utils/orderBookHook";
import { Loader } from "../lib/component/Loader";

const BookOrder = () => {
  const [bids, asks] = useOrderBook();
  return bids.length ? <Order bids={bids} asks={asks} /> : <Loader />;
};
export default BookOrder;
