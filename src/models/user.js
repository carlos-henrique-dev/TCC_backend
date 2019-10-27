const mongoose = require('mongoose');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  avatar: {
    _id: { type: mongoose.Schema.Types.ObjectId, ref: 'Image', default: null },
    url: { type: String, default: '' },
    key: { type: String, default: '' },
  },
  email: {
    type: String,
    unique: true,
    required: true,
    lowercase: true,
  },
  password: {
    type: String,
    required: true,
  },
  passwordResetToken: {
    type: Number,
    select: false,
  },
  passwordResetExpires: {
    type: Date,
    select: false,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

UserSchema.pre('save', async function hashPassword(next) {
  if (!this.isModified('password')) next();

  this.password = await bcrypt.hash(this.password, 8);
});

UserSchema.methods = {
  compareHash(hash) {
    return bcrypt.compare(hash, this.password);
  },

  generateToken(user) {
    return jwt.sign(
      {
        id: user._doc._id,
        name: user._doc.name,
        email: user._doc.email,
      },
      'secret',
      {
        expiresIn: 86400,
      },
    );
  },
};

mongoose.model('User', UserSchema);
