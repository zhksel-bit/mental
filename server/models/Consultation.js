const mongoose = require('mongoose');

const consultationSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false // 익명 상담의 경우 null 허용
  },
  title: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  content: {
    type: String,
    required: true,
    maxlength: 2000
  },
  status: {
    type: String,
    enum: ['pending', 'in_progress', 'completed'],
    default: 'pending'
  },
  encryptedTitle: {
    type: String,
    required: true
  },
  encryptedContent: {
    type: String,
    required: true
  }
}, {
  timestamps: true // createdAt과 updatedAt 자동 생성
});

// 상태 변경 전에 updatedAt 업데이트
consultationSchema.pre('findOneAndUpdate', function(next) {
  this.set({ updatedAt: new Date() });
  next();
});

module.exports = mongoose.model('Consultation', consultationSchema);