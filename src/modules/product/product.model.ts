import { Schema, model } from 'mongoose';
import { TProduct } from './product.interface';

const productSchema = new Schema<TProduct>({
  name: { type: String, required: true, unique: true },
  brand: { type: String, required: true },
  price: { type: Number, min: 5, required: true },
  category: {
    type: String,
    required: true,
    enum: {
      values: [
        'Writing',
        'Office Supplies',
        'Art Supplies',
        'Educational',
        'Technology',
      ],
      message: '{VALUE} is not valid category',
    },
  },
  description: { type: String, required: true },
  quantity: { type: Number, min: 0, required: true },
  inStock: { type: Boolean, required: true },
});

export const Product = model<TProduct>('Product', productSchema);
