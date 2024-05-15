import BlogInterface from '@/interfaces/Blog.interface';
import mongoose, { Schema } from 'mongoose';
import slugify from 'slugify';

const blogSchema = new Schema<BlogInterface>(
  {
    title: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
    },
    status: {
      type: String,
      enum: ['draft', 'submitted', 'published', 'archived', 'deleted'],
      default: 'draft',
    },
    totalViews: {
      type: Number,
      default: 0,
    },
    totalReads: {
      type: Number,
      default: 0,
    },
    author: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },
    coverImageUrl: {
      type: String,
      default: null,
    },
    // tags: [{ type: Schema.Types.ObjectId, ref: 'Tag' }],
    tags: [
      {
        _id: {
          type: Schema.Types.ObjectId,
          ref: 'Tag',
          required: true,
        },
        name: {
          type: String,
          required: true,
        },
      },
    ],
    isDeleted: {
      type: Boolean,
      default: false,
    },
    deletedAt: {
      type: Date,
      default: null,
    },
    deletedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
      default: null,
    },
  },
  { timestamps: true }
);

blogSchema.pre('save', function (next) {
  if (this.title) {
    this.slug = slugify(this.title, { lower: true, strict: true });
  }
  next();
});

export const Blog =
  mongoose.models.blogs || mongoose.model('blogs', blogSchema);
