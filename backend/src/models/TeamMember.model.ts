import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    name: String,
    position: String,
    bio: String,
    photoUrl: String,
  },
  {
    timestamps: true, 
  }
);

export const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
