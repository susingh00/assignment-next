export interface OrderBookType {
  price: number;
  total: number;
  amount: number;
  count: number;
}
export interface OrderBookPropsType {
  bids: OrderBookType[];
  asks: OrderBookType[];
}
