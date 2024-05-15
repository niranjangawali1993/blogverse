import { Document, Schema } from 'mongoose';
import Tag from './Tag.interface';

interface BlogInterface extends Document {
  title: string;
  content: string;
  slug: string;
  status: 'draft' | 'submitted' | 'published' | 'archived' | 'deleted';
  totalViews: number;
  totalReads: number;
  author: Schema.Types.ObjectId;
  coverImageUrl: string | null;
  tags: Tag[];
  isDeleted: boolean;
  deletedAt: Date | null;
  deletedBy: Schema.Types.ObjectId | null;
  createdAt: Date;
  updatedAt: Date;
}

export default BlogInterface;
