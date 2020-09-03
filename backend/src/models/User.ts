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

UserSchema.pre('save', function (next: Function) {
    if (this.isNew || this.isModified('password')) {
        const document = this;
        bcrypt.hash(
            document.password,
            saltRounds,
            (err: Error, hashedPassword: string) => {
                if (err) next(err);
                else {
                    document.password = hashedPassword;
                    next();
                }
            }
        );
    }
});

UserSchema.methods.isCorrectPassword = function (
    password: string,
    callback: Function
) {
    bcrypt.compare(password, this.password, function (
        err: Error,
        isSame: boolean
    ) {
        if (err) callback(err);
        else callback(err, isSame);
    });
};

export default model<User>('User', UserSchema);
