import { model, Schema } from "mongoose";
import { TOrder } from "./order.interface";

const orderSchema = new Schema<TOrder>({
    email: { type: String, required: true },
    product: { type: String, required: true },
    quantity: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    createdAt: {type: Date, default: Date.now},
    updatedAt: {type: Date, default: Date.now},
})

export const Order = model<TOrder>('Order', orderSchema);