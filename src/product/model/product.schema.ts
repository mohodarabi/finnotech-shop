import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'


export type ProductDocument = mongoose.HydratedDocument<Product>

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Product {

    @Prop({ required: true, type: String, unique: true })
    name: string

    @Prop({ required: true, type: String })
    categoryName: String

    @Prop({ required: true, type: String })
    description: String

    @Prop({ required: true, type: mongoose.Schema.Types.ObjectId, ref: 'User' })
    creator: string

}

export const ProductSchema = SchemaFactory.createForClass(Product)

ProductSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        ret.id = ret._id
        delete ret["_id"]
        return ret
    },
})

ProductSchema.set('toObject', {
    transform: function (doc, ret, opt) {
        ret.id = ret._id.toString()
        return ret
    },
})