import { Product } from "../product.schema";

export interface IProductDocument extends Product {
    _id: string;
    createdAt: Date,
    updatedAt: Date
}
