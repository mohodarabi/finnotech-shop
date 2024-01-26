import { Category } from "../category.schema";

export interface ICategoryDocument extends Category {
    _id: string;
    createdAt: Date,
    updatedAt: Date
}
