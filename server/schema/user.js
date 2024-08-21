// import mongoose from "mongoose";
// const Schema = mongoose.Schema;
// import bcrypt from 'bcrypt';

// const userSchema = new Schema({
//   username: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   email: {
//     type: String,
//     required: true,
//     unique: true
//   },
//   passwordHash: {
//     type: String,
//     required: true
//   },
//   createdAt: {
//     type: Date,
//     default: Date.now
//   },
//   updatedAt: {
//     type: Date,
//     default: Date.now
//   },
//   documents: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Document'
//   }],
//   sharedDocuments: [{
//     type: Schema.Types.ObjectId,
//     ref: 'Document'
//   }]
// });

// userSchema.pre('save', function(next) {
//   this.updatedAt = Date.now();
//   next();
// });

// userSchema.methods.comparePassword = function(password, callback) {
//   bcrypt.compare(password, this.passwordHash, (err, isMatch) => {
//     if (err) return callback(err);
//     callback(null, isMatch);
//   });
// };

// const User = mongoose.model('User', userSchema);

// // module.exports = User;
// module.exports = User;


import mongoose from 'mongoose';
const Schema = mongoose.Schema;
import bcrypt from 'bcrypt';

const userSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  username: {
    type: String,
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  updatedAt: {
    type: Date,
    default: Date.now
  },
  documents: [{
    type: Schema.Types.ObjectId,
    ref: 'Document'
  }],
  // sharedDocuments: [{
  //   type: Schema.Types.ObjectId,
  //   ref: 'Document'
  // }]
});

userSchema.pre('save', function(next) {
  this.updatedAt = Date.now();
  next();
});

userSchema.methods.comparePassword = function(password, callback) {
  bcrypt.compare(password, this.passwordHash, (err, isMatch) => {
    if (err) return callback(err);
    callback(null, isMatch);
  });
};

const User = mongoose.model('User', userSchema);

 export default  User;
