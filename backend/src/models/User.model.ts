import mongoose, { CallbackError } from "mongoose";
import bcrypt from 'bcryptjs';

const userSchema = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email: { type: String, unique: true, required: true, lowercase: true },
    password: { type: String, required: true, select: false },
    role: { type: String, default: "user", enum: ['user', 'admin'] },
    lastLogin: { type: Date },
    failedLoginAttempts: { type: Number, default: 0 },
    isLocked: { type: Boolean, default: false },
    lockUntil: { type: Date }
  },
  {
    timestamps: true
  }
);

// Hash password before saving
userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
    next();
  } catch (error) {
    next(error as CallbackError); 
  }
});

// Method to compare passwords
userSchema.methods.comparePassword = async function (candidatePassword: string): Promise<boolean> {
  return bcrypt.compare(candidatePassword, this.password);
};

// Method to handle failed login attempts
userSchema.methods.handleFailedLogin = function () {
  this.failedLoginAttempts += 1;

  if (this.failedLoginAttempts >= 5) {
    this.isLocked = true;
    this.lockUntil = new Date(Date.now() + 24 * 60 * 60 * 1000); // Lock for 24 hours
  }

  return this.save();
};

// Method to reset failed login attempts
userSchema.methods.resetFailedLoginAttempts = function () {
  this.failedLoginAttempts = 0;
  this.isLocked = false;
  this.lockUntil = undefined;
  return this.save();
};

export default mongoose.model("User", userSchema);
