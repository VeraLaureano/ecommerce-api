export interface ICard {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  available: boolean;
  id?: string;
}