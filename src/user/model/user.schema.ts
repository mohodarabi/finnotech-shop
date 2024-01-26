import { Prop, Schema, SchemaFactory, raw } from '@nestjs/mongoose'
import * as mongoose from 'mongoose'


export type UserDocument = mongoose.HydratedDocument<User>

@Schema({ timestamps: true, toJSON: { virtuals: true }, toObject: { virtuals: true } })
export class User {

    @Prop({ required: true, type: String })
    fullname: string

    @Prop({ required: true, type: String, unique: true, sparse: true })
    email: string

    @Prop({ required: true, type: String })
    password: string

    @Prop(raw({
        code: { type: String, length: 4 },
        expTime: { type: Date },
        isUsed: { type: Boolean, default: false }
    }))
    otp: Record<string, any>

    @Prop({ default: false, type: Boolean })
    isVerified: Boolean

}

export const UserSchema = SchemaFactory.createForClass(User)

UserSchema.set('toJSON', {
    transform: function (doc, ret, opt) {
        ret.id = ret._id
        delete ret["_id"]
        delete ret["password"]
        delete ret["otp"]
        delete ret["isVerified"]
        return ret
    },
})

UserSchema.set('toObject', {
    transform: function (doc, ret, opt) {
        ret.id = ret._id.toString()
        return ret
    },
})