// import { Schema, model, connect } from 'mongoose';

export interface TProduct {
    name: string;
    brand: string;
    price: number;
    category: string;
    description: string;
    quantity: number;
    inStock: boolean
}