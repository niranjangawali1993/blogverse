import mongoose, { Schema } from 'mongoose';

const tagSchema = new Schema({
  name: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
});

const Tag = mongoose.models.tags || mongoose.model('tags', tagSchema);

export default Tag;
