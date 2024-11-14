import { ICart } from './../interfaces/Cart.interface'; 
import mongoose, { Schema } from 'mongoose';

const cartSchema = new Schema<ICart>({
  userId: mongoose.Types.ObjectId,
  items: [
    {
      cardId: { type: mongoose.Types.ObjectId, ref: 'Card', required: true },
      quantity: { type: Number, required: true, default: 1 },
    },
  ],
});

export default mongoose.model<ICart>('Cart', cartSchema);
