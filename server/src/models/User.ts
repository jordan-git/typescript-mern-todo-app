import { model, Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';
import { NextFunction } from 'express';

const saltRounds = 10;

interface User extends Document {
    username: string;
    password: string;
    isCorrectPassword: (password: string) => Promise<boolean>;
}

const UserSchema: Schema = new Schema({
    username: {
        type: String,
        minlength: 4,
        maxlength: 32,
        required: true,
        unique: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
    },
});

UserSchema.pre<User>('save', async function (next: NextFunction) {
    const document = this;
    if (document.isNew || document.isModified('password')) {
        const hashedPassword = await bcrypt.hash(document.password, saltRounds);
        document.password = hashedPassword;
        next();
    }
});

UserSchema.methods.isCorrectPassword = async function (
    password: string
): Promise<boolean> {
    const match = await bcrypt.compare(password, this.password);
    if (match) return true;
    else return false;
};

export default model<User>('User', UserSchema);
