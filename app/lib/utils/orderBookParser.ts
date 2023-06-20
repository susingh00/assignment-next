import { Dispatch, SetStateAction } from "react";
import { ORDER_BOOK } from "./constant";
import { OrderBookType } from "./types/BookOrder.types";

export const orderBookParser = (
  values: number[],
  bids: OrderBookType[],
  asks: OrderBookType[],
  setBids: Dispatch<SetStateAction<OrderBookType[]>>,
  setAsks: Dispatch<SetStateAction<OrderBookType[]>>
) => {
  if (values.length === 3) {
    Parser(values, bids, asks, setBids, setAsks);
  } else if (values.length > 3) {
    values.forEach((value: any) => {
      Parser(value, bids, asks, setBids, setAsks);
    });
  }
};

const Parser = (
  values: number[],
  bids: OrderBookType[],
  asks: OrderBookType[],
  setBids: Dispatch<SetStateAction<OrderBookType[]>>,
  setAsks: Dispatch<SetStateAction<OrderBookType[]>>
) => {
  if (values[ORDER_BOOK.COUNT] > 0) {
    if (values[ORDER_BOOK.AMOUNT] > 0) {
      updateBids(values, bids, setBids);
    } else {
      updateAsks(values, asks, setAsks);
    }
  } else if (values[ORDER_BOOK.COUNT] === 0) {
    if (values[ORDER_BOOK.AMOUNT] === -1) {
      let remove_bids = [...bids];
      let filter_bids = remove_bids.filter(
        (bid) => bid.price !== values[ORDER_BOOK.PRICE]
      );
      setBids([...filter_bids]);
    } else if (values[ORDER_BOOK.AMOUNT] === 1) {
      let remove_asks = [...asks];
      let filter_asks = remove_asks.filter(
        (ask) => ask.price !== values[ORDER_BOOK.PRICE]
      );
      setAsks([...filter_asks]);
    }
  }
};

const updateBids = (
  values: number[],
  bids: OrderBookType[],
  setBids: Dispatch<SetStateAction<OrderBookType[]>>
) => {
  const bid_payload: OrderBookType = {
    count: values[ORDER_BOOK.COUNT],
    amount: Number(values[ORDER_BOOK.AMOUNT].toFixed(4)),
    price: values[ORDER_BOOK.PRICE],
    total: Number(values[ORDER_BOOK.AMOUNT].toFixed(4)),
  };
  let updated_bids: OrderBookType[] = [];
  if (bids.length) {
    let _bids = [...bids];
    let total_bid = 0;
    _bids.forEach((bid: OrderBookType) => {
      total_bid += Number(bid.amount);
      if (bid.price === bid_payload.price) {
        updated_bids.push(bid_payload);
      } else {
        bid.total = total_bid;
        updated_bids.push(bid);
      }
    });
    setBids([...updated_bids]);
  } else {
    updated_bids.push(bid_payload);
    setBids((prev) => [...prev, bid_payload]);
  }
};

const updateAsks = (
  values: number[],
  asks: OrderBookType[],
  setAsks: Dispatch<SetStateAction<OrderBookType[]>>
) => {
  const ask_payload = {
    count: values[ORDER_BOOK.COUNT],
    amount: Math.abs(Number(values[ORDER_BOOK.AMOUNT].toFixed(4))),
    price: values[ORDER_BOOK.PRICE],
    total: Math.abs(Number(values[ORDER_BOOK.AMOUNT].toFixed(4))),
  };
  let updated_asks: OrderBookType[] = [];
  if (asks.length) {
    let _asks = [...asks];
    let total_bid = 0;
    _asks.forEach((ask) => {
      total_bid += ask.amount;
      if (ask.price === ask_payload.price) {
        updated_asks.push(ask_payload);
      } else {
        ask.total = total_bid;
        updated_asks.push(ask);
      }
    });
    setAsks([...updated_asks]);
  } else {
    setAsks((prev) => [...prev, ask_payload]);
  }
};
