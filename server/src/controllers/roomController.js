// const Room = require('../models/Room');
// const User = require('../models/User');

// // Initialize chat room
// const initializeRoom = async (req, res) => {
//   try {
//     const { otheruser } = req.body;
//     const currentUserId = req.user._id;

//     if (!otheruser) {
//       return res.status(400).json({
//         success: false,
//         message: "Other user is required to create a chat room"
//       });
//     }

//     // Check if other user exists
//     const otherUserExists = await User.findById(otheruser);
//     if (!otherUserExists) {
//       return res.status(404).json({
//         success: false,
//         message: "Other user not found"
//       });
//     }

//     // Check if room already exists between these users
//     let room = await Room.findOne({
//       users: { $all: [currentUserId, otheruser] },
//       isPrivate: true
//     }).populate('users', '-password');

//     // If room doesn't exist, create new one
//     if (!room) {
//       room = new Room({
//         users: [currentUserId, otheruser],
//         isPrivate: true
//       });
//       await room.save();
//       await room.populate('users', '-password');
//     }

//     res.status(200).json({
//       success: true,
//       data: {
//         _id: room._id,
//         users: room.users.map(user => ({
//           _id: user._id,
//           fullName: user.fullName,
//           username: user.username,
//           email: user.email,
//           avatar: user.avatar
//         }))
//       },
//       message: "Room initialized successfully"
//     });

//   } catch (error) {
//     console.error('Initialize room error:', error);
//     res.status(500).json({
//       success: false,
//       message: "Error initializing chat room"
//     });
//   }
// };

// // Get user's chat rooms
// const getUserRooms = async (req, res) => {
//   try {
//     const userId = req.user._id;

//     const rooms = await Room.find({
//       users: userId
//     }).populate('users', '-password');

//     const formattedRooms = rooms.map(room => ({
//       _id: room._id,
//       users: room.users.map(user => ({
//         _id: user._id,
//         fullName: user.fullName,
//         username: user.username,
//         email: user.email,
//         avatar: user.avatar
//       }))
//     }));

//     res.status(200).json({
//       success: true,
//       data: formattedRooms,
//       message: "Rooms fetched successfully"
//     });

//   } catch (error) {
//     console.error('Get user rooms error:', error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching user rooms"
//     });
//   }
// };

// module.exports = {
//   initializeRoom,
//   getUserRooms
// };
// This code defines two functions for managing chat rooms in a messaging application.
// The `initializeRoom` function creates a new chat room between two users if it doesn't already exist, while the `getUserRooms` function retrieves all chat rooms for the authenticated user. Both functions handle errors and return appropriate responses.   

const Room = require('../models/Room');
const User = require('../models/User');

// Initialize chat room - MODIFIED to allow self-chat rooms
const initializeRoom = async (req, res) => {
  try {
    const { otheruser } = req.body;
    const currentUserId = req.user._id;

    if (!otheruser) {
      return res.status(400).json({
        success: false,
        message: "Other user is required to create a chat room"
      });
    }

    // Check if other user exists
    const otherUserExists = await User.findById(otheruser);
    if (!otherUserExists) {
      return res.status(404).json({
        success: false,
        message: "Other user not found"
      });
    }

    // Allow creating room with same user (self-chat)
    let room;
    
    if (currentUserId.toString() === otheruser.toString()) {
      // Self-chat room - create with single user duplicated
      room = await Room.findOne({
        users: { $all: [currentUserId] },
        $expr: { $eq: [{ $size: "$users" }, 2] },
        isPrivate: true
      }).populate('users', '-password');

      if (!room) {
        room = new Room({
          users: [currentUserId, currentUserId], // Same user twice for self-chat
          isPrivate: true
        });
        await room.save();
        await room.populate('users', '-password');
      }
    } else {
      // Regular chat room between two different users
      room = await Room.findOne({
        users: { $all: [currentUserId, otheruser] },
        isPrivate: true
      }).populate('users', '-password');

      if (!room) {
        room = new Room({
          users: [currentUserId, otheruser],
          isPrivate: true
        });
        await room.save();
        await room.populate('users', '-password');
      }
    }

    res.status(200).json({
      success: true,
      data: {
        _id: room._id,
        users: room.users.map(user => ({
          _id: user._id,
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          avatar: user.avatar
        }))
      },
      message: "Room initialized successfully"
    });

  } catch (error) {
    console.error('Initialize room error:', error);
    res.status(500).json({
      success: false,
      message: "Error initializing chat room"
    });
  }
};

// Get user's chat rooms
const getUserRooms = async (req, res) => {
  try {
    const userId = req.user._id;

    const rooms = await Room.find({
      users: userId
    }).populate('users', '-password');

    const formattedRooms = rooms.map(room => ({
      _id: room._id,
      users: room.users.map(user => ({
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      }))
    }));

    res.status(200).json({
      success: true,
      data: formattedRooms,
      message: "Rooms fetched successfully"
    });

  } catch (error) {
    console.error('Get user rooms error:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching user rooms"
    });
  }
};

module.exports = {
  initializeRoom,
  getUserRooms
};
