import { ORDER_BOOK } from "./constant";
import { OrderBookType } from "./types/BookOrder.types";

export const orderBookParser = (
  values: number[],
  bids: OrderBookType[],
  asks: OrderBookType[]
) => {
  let updatedBids: OrderBookType[] = [];
  let updatedAsks: OrderBookType[] = [];

  if (values.length === 3) {
    parser(values, bids, asks, updatedBids, updatedAsks);
  } else if (values.length > 3) {
    values.forEach((value: any) => {
      parser(value, bids, asks, updatedBids, updatedAsks);
    });
  }
  return {
    updatedBids,
    updatedAsks,
  };
};

const parser = (
  values: number[],
  bids: OrderBookType[],
  asks: OrderBookType[],
  updatedBids: OrderBookType[],
  updatedAsks: OrderBookType[]
) => {
  if (values[ORDER_BOOK.COUNT] > 0) {
    if (values[ORDER_BOOK.AMOUNT] > 0) {
      bidsParser(values, bids, updatedBids);
    } else {
      asksParser(values, asks, updatedAsks);
    }
  } else if (values[ORDER_BOOK.COUNT] === 0) {
    if (values[ORDER_BOOK.AMOUNT] === -1) {
      const remove_bids = [...bids];

      const filter_bids = remove_bids.filter(
        (bid) => bid.price !== values[ORDER_BOOK.PRICE]
      );
      updatedBids = [...filter_bids];
    } else if (values[ORDER_BOOK.AMOUNT] === 1) {
      const remove_asks = [...asks];

      const filter_asks = remove_asks.filter(
        (ask) => ask.price !== values[ORDER_BOOK.PRICE]
      );
      updatedAsks = [...filter_asks];
    }
  }
};

const bidsParser = (
  values: number[],
  bids: OrderBookType[],
  updatedBids: OrderBookType[]
) => {
  const bid_payload: OrderBookType = {
    count: values[ORDER_BOOK.COUNT],
    amount: Number(values[ORDER_BOOK.AMOUNT].toFixed(4)),
    price: values[ORDER_BOOK.PRICE],
    total: Number(values[ORDER_BOOK.AMOUNT].toFixed(4)),
  };
  if (bids.length) {
    let _bids = [...bids];
    let total_bid = 0;
    _bids.forEach((bid: OrderBookType) => {
      total_bid += Number(bid.amount);
      if (bid.price === bid_payload.price) {
        updatedBids.push(bid_payload);
      } else {
        bid.total = total_bid;
        updatedBids.push(bid);
      }
    });
  } else {
    updatedBids.push(bid_payload);
  }
};

const asksParser = (
  values: number[],
  asks: OrderBookType[],
  updatedAsks: OrderBookType[]
) => {
  const ask_payload = {
    count: values[ORDER_BOOK.COUNT],
    amount: Math.abs(Number(values[ORDER_BOOK.AMOUNT].toFixed(4))),
    price: values[ORDER_BOOK.PRICE],
    total: Math.abs(Number(values[ORDER_BOOK.AMOUNT].toFixed(4))),
  };
  if (asks.length) {
    let _asks = [...asks];
    let total_bid = 0;
    _asks.forEach((ask) => {
      total_bid += ask.amount;
      if (ask.price === ask_payload.price) {
        updatedAsks.push(ask_payload);
      } else {
        ask.total = total_bid;
        updatedAsks.push(ask);
      }
    });
  } else {
    updatedAsks.push(ask_payload);
  }
};
