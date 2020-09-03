import { model, Schema, Document } from 'mongoose';
import * as bcrypt from 'bcrypt';

const saltRounds = 10;

interface User extends Document {
    username: string;
    password: string;
}

const UserSchema: Schema = new Schema({
    username: { type: String, required: true, unique: true },
    password: { type: String, required: true },
});

UserSchema.pre('save', async function (next: Function) {
    const document = this;
    if (document.isNew || document.isModified('password')) {
        const hashedPassword = await bcrypt.hash(document.password, saltRounds);
        document.password = hashedPassword;
        next();
    }
});

UserSchema.methods.isCorrectPassword = async function (password: string) {
    const match = await bcrypt.compare(password, this.password);
    if (match) return true;
    else return false;
};

export default model<User>('User', UserSchema);
