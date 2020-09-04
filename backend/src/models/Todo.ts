import { model, Schema, Document } from 'mongoose';

interface Todo extends Document {
    owner: string;
    description: string;
    completed: boolean;
}

const TodoSchema: Schema = new Schema({
    owner: { type: String, required: true },
    description: { type: String, required: true },
    completed: { type: Boolean, required: true },
});

export default model<Todo>('Todo', TodoSchema);
