const mongoose = require('mongoose');

const responseSchema = new mongoose.Schema({
  consultationId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Consultation',
    required: true
  },
  counselorId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000
  },
  encryptedContent: {
    type: String,
    required: true
  }
}, {
  timestamps: true // createdAt과 updatedAt 자동 생성
});

module.exports = mongoose.model('Response', responseSchema);