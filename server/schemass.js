// const { Schema, model } = require("mongoose")

// const Document = new Schema({
//   _id: String,
//   data: Object,
// })

// module.exports = model("Document", Document)





import { mongoose } from 'mongoose';

const userSchema = new mongoose.Schema({
  username: {
    type: String,
    // required: true,
    // unique: true,
    lowercase: true
  },
  password: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  }, 
  name: {
    type: String,
    required: true
  }
}, {timestamps: true}
);

const User = mongoose.model('User', userSchema);
// export const User = mongoose.model('User', userSchema);

const documentSchema = new mongoose.Schema(
  {
    username: {
      type: String,
      // required: true,
      // unique: true,
      lowercase: true
    },
    _id: {
        type: String,
        required: true
    },
    title: {
      type: String
    },
    data: {
      type: Object
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    sharedWith: [{
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    }]
  }, {timestamps: true}
);

const Document = mongoose.model('Document', documentSchema);

// modules.exports = { User, Document };

export { User, Document };