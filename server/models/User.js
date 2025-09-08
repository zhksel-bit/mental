const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    unique: true,
    sparse: true, // null 값을 허용하면서 고유성 유지
    trim: true,
    lowercase: true
  },
  temporaryCode: {
    type: String,
    unique: true,
    sparse: true
  },
  codeExpiry: {
    type: Date
  },
  isAdmin: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true // createdAt과 updatedAt 자동 생성
});

// 임시 코드 생성 메서드
userSchema.statics.generateTemporaryCode = function() {
  return Math.random().toString(36).substring(2, 8).toUpperCase();
};

// 임시 코드 유효성 검사 메서드
userSchema.methods.isCodeValid = function() {
  return this.codeExpiry && this.codeExpiry > new Date();
};

// 비밀번호 해싱 (관리자용)
userSchema.pre('save', async function(next) {
  if (!this.isModified('password')) return next();
  
  try {
    const salt = await bcrypt.genSalt(12);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error);
  }
});

// 비밀번호 비교 메서드 (관리자용)
userSchema.methods.comparePassword = async function(candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);