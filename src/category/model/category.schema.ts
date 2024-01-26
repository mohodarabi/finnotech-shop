import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'


export type CategoryDocument = mongoose.HydratedDocument<Category>

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class Category {

    @Prop({ required: true, type: String, unique: true })
    name: string

    @Prop({ required: true, type: String })
    description: string

    @Prop({ required: true, type: Boolean, default: true })
    isActive: Boolean

}

export const CategorySchema = SchemaFactory.createForClass(Category)

CategorySchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        ret.id = ret._id
        delete ret["_id"]
        return ret
    },
})

CategorySchema.set('toObject', {
    transform: function (doc, ret, opt) {
        ret.id = ret._id.toString()
        return ret
    },
})