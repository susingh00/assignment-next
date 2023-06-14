"use client";
import useWebSocket from "react-use-websocket";
import { Order } from "./component/Order";
import { useEffect, useState } from "react";
import { socket_url } from "../lib/utils/socket";
import { orderBook } from "../lib/utils/constant";
import { BookOrderType } from "../lib/utils/types/BookOrder.types";
import { orderBookParser } from "../lib/utils/orderBookParser";
import { Loader } from "../lib/component/Loader";

const BookOrder = () => {
  const [bids, setBids] = useState<Array<BookOrderType>>([]);
  const [asks, setAsks] = useState<Array<BookOrderType>>([]);
  const ws = useWebSocket(socket_url, {
    onOpen: () => console.log("opened"),
    shouldReconnect: () => true,
    onMessage: (_msg) => {
      if (ws.lastJsonMessage?.length === 2) {
        let eventData: any = ws.lastJsonMessage;
        const values: [] | any = eventData[orderBook.DATA];
        if (values.length === 3) {
          orderBookParser(values, bids, asks, setBids, setAsks);
        } else if (values.length > 3) {
          console.log("values: ", values);
          values.forEach((value: number[]) => {
            orderBookParser(value, bids, asks, setBids, setAsks);
          });
        }
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
