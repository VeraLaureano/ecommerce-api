interface CartItem {
  cardId: string;
  quantity: number;
}

export interface ICart {
  userId: string;
  items: CartItem[];
}