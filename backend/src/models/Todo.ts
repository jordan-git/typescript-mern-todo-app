import { model, Schema, Document } from 'mongoose';

interface Todo extends Document {
    description: string;
    completed: boolean;
}

const TodoSchema: Schema = new Schema({
    description: { type: String, required: true },
    completed: { type: String, required: true },
});

export default model<Todo>('Todo', TodoSchema);
