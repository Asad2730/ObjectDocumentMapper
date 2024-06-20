import * as mongoose from 'mongoose';

export interface IUser extends mongoose.Document {
    firstName: string
    lastName: string
    email: string
    role: string
    fullName?: string //virtual filed
}

const UserSchema = new mongoose.Schema({
    firstName: { type: String, require: true },
    lastName: { type: String, require: true },
    email: { type: String, require: true, unique: true },
    role: { type: String, enum: ['user', 'admin'], require: true } //Enum
})

// Virtual field

UserSchema.virtual('fullName').get(function (this: IUser) {
    return `${this.firstName} ${this.lastName}`
})

// Ensure virtual fields are serialized

UserSchema.set('toJSON', { virtuals: true })
UserSchema.set('toObject', { virtuals: true })

export const User = mongoose.model<IUser>('user', UserSchema)
