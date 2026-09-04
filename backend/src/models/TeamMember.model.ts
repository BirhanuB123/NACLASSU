import mongoose from 'mongoose';

const teamMemberSchema = new mongoose.Schema(
  {
    name: String,
    position: String,
    bio: String,
    photoUrl: String,
    photoStoragePath: String, // path within the Firebase Storage bucket, so we can delete it later
  },
  {
    timestamps: true,
  }
);

export const TeamMember = mongoose.model('TeamMember', teamMemberSchema);
