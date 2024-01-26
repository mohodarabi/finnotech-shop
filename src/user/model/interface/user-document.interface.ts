import { User } from "../user.schema";

export interface IUserDocument extends User {
    _id: string
    createdAt: Date
    updatedAt: Date
}