import { useEffect, useState } from "react";
import { ORDER_BOOK } from "./constant";
import { OrderBookType } from "./types/BookOrder.types";
import { SOCKET_URL } from "./socket";
import { useWebSocket } from "react-use-websocket/dist/lib/use-websocket";
import { orderBookParser } from "./orderBookParser";

export const useOrderBook = () => {
  const [bids, setBids] = useState<Array<OrderBookType>>([]);
  const [asks, setAsks] = useState<Array<OrderBookType>>([]);

  const ws = useWebSocket(SOCKET_URL, {
    shouldReconnect: () => true,
    onMessage: (_msg) => {
      if (ws.lastJsonMessage?.length === 2) {
        const eventData = ws.lastJsonMessage as [];
        const values = eventData[ORDER_BOOK.DATA_INDEX];
        const { updatedBids, updatedAsks } = orderBookParser(
          values,
          bids,
          asks
        );
        if (updatedBids.length) setBids([...updatedBids]);
        if (updatedAsks.length) setAsks([...updatedAsks]);
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

  return [bids, asks];
};
