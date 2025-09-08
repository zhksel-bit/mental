const mongoose = require('mongoose');

const chatMessageSchema = new mongoose.Schema({
  role: {
    type: String,
    enum: ['user', 'assistant'],
    required: true
  },
  content: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  }
});

const chatSessionSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // 익명 사용자의 경우 null 허용
  },
  messages: [chatMessageSchema]
}, {
  timestamps: true // createdAt과 updatedAt 자동 생성
});

module.exports = mongoose.model('ChatSession', chatSessionSchema);