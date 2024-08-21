import mongoose from "mongoose";
const Schema = mongoose.Schema;

const documentSchema = new Schema({
  _id: {
    type: String,
    // required: true,
    // unique: true
  },
  docId: {
    type: String,
    // required: true,
    // unique: true
  },
  data: {
    type: Object,
    // required: true
  },
  username: {
    type: String,
    // ref: 'User',
    required: true
  },
  // ownerId: {
  //   type: Schema.Types.ObjectId,
  //   ref: 'User',
  //   // required: true
  // },
  // sharedWith: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'User'
  // }],
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  }
});

documentSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

const Document = mongoose.model('Document', documentSchema);

// module.exports = Document;
export default Document;
