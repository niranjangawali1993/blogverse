import { Schema } from 'mongoose';

interface TagInterface extends Document {
  _id: Schema.Types.ObjectId;
  name: string;
}

export default TagInterface;
