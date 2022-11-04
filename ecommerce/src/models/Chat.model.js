import mongoose from 'mongoose';

const ChatSchema = new mongoose.Schema({
  email: { type: String, required: true },
  messages: [
    {
      timestamp: { type: Date, default: Date.now },
      message: { type: String, required: true },
      type: { type: String, required: true },
    },
  ],
});

export const Chat = mongoose.model('chats', ChatSchema);
