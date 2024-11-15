import { Schema, model } from 'mongoose';
import { ICard } from './../interfaces/Card.interface';

const CardSchema = new Schema<ICard>({
  name: { type: String, required: true },
  description: { type: String, required: [true, 'NAME_IS_REQUIRED'] },
  price: { type: Number, required: true },
  imageUrl: { type: String, required: true },
  available: { type: Boolean, default: true }
});

export default model<ICard>('Card', CardSchema);
