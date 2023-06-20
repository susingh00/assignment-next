export interface OrderBookType {
  price: number;
  total: number;
  amount: number;
  count: number;
}
export interface BookOrderPropsType {
  bids: OrderBookType[];
  asks: OrderBookType[];
}
