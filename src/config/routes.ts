import { VERSION } from './env';

export const routes = {
  user: `/api/${VERSION}/user`,
  cards: `/api/${VERSION}/cards`,
  cart: `/api/${VERSION}/cart`,
  items: `/api/${VERSION}/items`,
  payment: `/api/${VERSION}/payment`,
  docs: '/api-docs',
};