import mongoose from 'mongoose';

const DocumentSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    description: { type: String, default: '' },
    url: { type: String, required: true }, // public Firebase Storage URL
    storagePath: { type: String, required: true }, // path within the bucket, needed to delete later
    fileType: { type: String, default: 'pdf' },
    category: { type: String, default: 'general' }, // e.g. 'lessons', 'bulletins'
    uploadedBy: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  },
  { timestamps: true }
);

export default mongoose.model('Document', DocumentSchema);
