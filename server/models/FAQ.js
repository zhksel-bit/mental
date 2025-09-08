const mongoose = require('mongoose');

const faqSchema = new mongoose.Schema({
  question: {
    type: String,
    required: true,
    trim: true,
    maxlength: 300
  },
  answer: {
    type: String,
    required: true,
    maxlength: 2000
  },
  category: {
    type: String,
    required: true,
    trim: true,
    maxlength: 50
  }
}, {
  timestamps: true // createdAt과 updatedAt 자동 생성
});

module.exports = mongoose.model('FAQ', faqSchema);