// const mongoose = require('mongoose');

// const roomSchema = new mongoose.Schema({
//   users: [{
//     type: mongoose.Schema.Types.ObjectId,
//     ref: 'User',
//     required: true
//   }],
//   isPrivate: {
//     type: Boolean,
//     default: true
//   }
// }, {
//   timestamps: true
// });

// // Ensure only two users in private chat
// roomSchema.pre('save', function(next) {
//   if (this.isPrivate && this.users.length !== 2) {
//     return next(new Error('Private chat rooms must have exactly 2 users'));
//   }
//   next();
// });

// module.exports = mongoose.model('Room', roomSchema);

// This code defines a Mongoose schema for chat rooms, ensuring that private chat rooms contain exactly two users. It also includes timestamps for creation and updates. The schema is exported for use in other parts of the application.
// This code defines a Mongoose schema for chat rooms, ensuring that private chat rooms contain exactly two users. It also includes timestamps for creation and updates. The schema is exported for use in other parts of the application.

const mongoose = require('mongoose');

const roomSchema = new mongoose.Schema({
  users: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  }],
  isPrivate: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Modified validation to allow self-chat (same user twice)
roomSchema.pre('save', function(next) {
  if (this.isPrivate && this.users.length !== 2) {
    return next(new Error('Private chat rooms must have exactly 2 users'));
  }
  next();
});

module.exports = mongoose.model('Room', roomSchema);
