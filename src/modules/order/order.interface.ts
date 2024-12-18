export interface TOrder {
  email: string;
  product: string;
  quantity: number;
  price: number;
  totalPrice: number;
  createdAt: Date;
  updatedAt: Date;
}
