"use client";
import useWebSocket from "react-use-websocket";
import { Order } from "./component/Order";
import { useEffect, useState } from "react";
import { SOCKET_URL } from "../lib/utils/socket";
import { ORDER_BOOK } from "../lib/utils/constant";
import { OrderBookType } from "../lib/utils/types/BookOrder.types";
import { orderBookParser } from "../lib/utils/orderBookParser";
import { Loader } from "../lib/component/Loader";

const BookOrder = () => {
  const [bids, setBids] = useState<Array<OrderBookType>>([]);
  const [asks, setAsks] = useState<Array<OrderBookType>>([]);
  const ws = useWebSocket(SOCKET_URL, {
    shouldReconnect: () => true,
    onMessage: (_msg) => {
      if (ws.lastJsonMessage?.length === 2) {
        const eventData: any = ws.lastJsonMessage;
        const values: [] | any = eventData[ORDER_BOOK.DATA];
        orderBookParser(values, bids, asks, setBids, setAsks);
      }
    },
  });

  useEffect(() => {
    ws.sendJsonMessage({
      event: "subscribe",
      channel: "book",
      symbol: "tBTCUSD",
    });
  }, []);

  return bids.length ? <Order bids={bids} asks={asks} /> : <Loader />;
};
export default BookOrder;
