// const User = require('../models/User');
// const generateToken = require('../utils/generateToken');

// // Register user
// const registerUser = async (req, res) => {
//   try {
//     const { fullName, username, email, password } = req.body;

//     // Validate required fields
//     if (!fullName || !username || !email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "All fields are required"
//       });
//     }

//     // Check if user already exists
//     const existingUserByEmail = await User.findOne({ email });
//     if (existingUserByEmail) {
//       return res.status(409).json({
//         success: false,
//         message: "Email is already registered"
//       });
//     }

//     const existingUserByUsername = await User.findOne({ username });
//     if (existingUserByUsername) {
//       return res.status(409).json({
//         success: false,
//         message: "Username is already taken"
//       });
//     }

//     // Create new user
//     const user = new User({
//       fullName,
//       username,
//       email,
//       password,
//       avatar: `https://avatar.iran.liara.run/username?username=${fullName}`
//     });

//     await user.save();

//     res.status(201).json({
//       success: true,
//       data: {
//         _id: user._id,
//         fullName: user.fullName,
//         username: user.username,
//         email: user.email,
//         avatar: user.avatar
//       },
//       message: "User created successfully"
//     });

//   } catch (error) {
//     console.error('Registration error:', error);
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong while registering the user"
//     });
//   }
// };

// // Login user
// const loginUser = async (req, res) => {
//   try {
//     const { email, password } = req.body;

//     // Validate required fields
//     if (!email || !password) {
//       return res.status(400).json({
//         success: false,
//         message: "Email and password are required"
//       });
//     }

//     // Find user by email
//     const user = await User.findOne({ email });
//     if (!user) {
//       return res.status(404).json({
//         success: false,
//         message: "User does not exist with this email"
//       });
//     }

//     // Check password
//     const isPasswordValid = await user.comparePassword(password);
//     if (!isPasswordValid) {
//       return res.status(401).json({
//         success: false,
//         message: "Invalid password"
//       });
//     }

//     // Generate token
//     const accessToken = generateToken(user._id);

//     // Set cookie
//     res.cookie('accessToken', accessToken, {
//       httpOnly: true,
//       secure: process.env.NODE_ENV === 'production',
//       sameSite: 'strict',
//       maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
//     });

//     res.status(200).json({
//       success: true,
//       data: {
//         user: {
//           _id: user._id,
//           fullName: user.fullName,
//           username: user.username,
//           email: user.email,
//           avatar: user.avatar
//         },
//         accessToken
//       },
//       message: "User logged in successfully"
//     });

//   } catch (error) {
//     console.error('Login error:', error);
//     res.status(500).json({
//       success: false,
//       message: "Something went wrong during login"
//     });
//   }
// };

// // Logout user
// const logoutUser = async (req, res) => {
//   try {
//     res.clearCookie('accessToken');
//     res.status(200).json({
//       success: true,
//       message: "User logged out"
//     });
//   } catch (error) {
//     console.error('Logout error:', error);
//     res.status(500).json({
//       success: false,
//       message: "Error during logout process"
//     });
//   }
// };

// // Get user profile
// const getUserProfile = async (req, res) => {
//   try {
//     const user = req.user;
    
//     res.status(200).json({
//       success: true,
//       data: {
//         _id: user._id,
//         fullName: user.fullName,
//         username: user.username,
//         email: user.email,
//         avatar: user.avatar
//       },
//       message: "User fetched successfully"
//     });
//   } catch (error) {
//     console.error('Get profile error:', error);
//     res.status(500).json({
//       success: false,
//       message: "Error fetching user profile"
//     });
//   }
// };

// // Search users
// const searchUsers = async (req, res) => {
//   try {
//     const { searchTerm } = req.query;

//     if (!searchTerm) {
//       return res.status(400).json({
//         success: false,
//         message: "Search term is required"
//       });
//     }

//     const users = await User.find({
//       $and: [
//         { _id: { $ne: req.user._id } }, // Exclude current user
//         {
//           $or: [
//             { username: { $regex: searchTerm, $options: 'i' } },
//             { email: { $regex: searchTerm, $options: 'i' } },
//             { fullName: { $regex: searchTerm, $options: 'i' } }
//           ]
//         }
//       ]
//     }).select('-password');

//     res.status(200).json({
//       success: true,
//       data: users,
//       message: "Users fetched successfully"
//     });

//   } catch (error) {
//     console.error('Search users error:', error);
//     res.status(500).json({
//       success: false,
//       message: "Error searching users"
//     });
//   }
// };

// module.exports = {
//   registerUser,
//   loginUser,
//   logoutUser,
//   getUserProfile,
//   searchUsers
// };
// This code defines the user controller for handling user-related operations such as registration, login, logout, fetching user profile, and searching users. It uses Mongoose for database interactions and includes error handling for various scenarios. The controller methods return appropriate JSON responses based on the success or failure of the operations.
// This code defines the user controller for handling user-related operations such as registration, login, logout, fetching user profile, and searching users. It uses Mongoose for database interactions and includes error handling for various scenarios. The controller methods return appropriate JSON responses based on the success or failure of the operations.    


const User = require('../models/User');
const generateToken = require('../utils/generateToken');

// Register user
const registerUser = async (req, res) => {
  try {
    const { fullName, username, email, password } = req.body;

    // Validate required fields
    if (!fullName || !username || !email || !password) {
      return res.status(400).json({
        success: false,
        message: "All fields are required"
      });
    }

    // Check if user already exists
    const existingUserByEmail = await User.findOne({ email: email.toLowerCase() });
    if (existingUserByEmail) {
      return res.status(409).json({
        success: false,
        message: "Email is already registered"
      });
    }

    const existingUserByUsername = await User.findOne({ username: username.toLowerCase() });
    if (existingUserByUsername) {
      return res.status(409).json({
        success: false,
        message: "Username is already taken"
      });
    }

    // Create new user
    const user = new User({
      fullName,
      username: username.toLowerCase(),
      email: email.toLowerCase(),
      password,
      avatar: `https://avatar.iran.liara.run/username?username=${fullName}`
    });

    await user.save();

    res.status(201).json({
      success: true,
      data: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      },
      message: "User created successfully"
    });

  } catch (error) {
    console.error('Registration error:', error);
    res.status(500).json({
      success: false,
      message: "Something went wrong while registering the user"
    });
  }
};

// Login user
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate required fields
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Email and password are required"
      });
    }

    // Find user by email
    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User does not exist with this email"
      });
    }

    // Check password
    const isPasswordValid = await user.comparePassword(password);
    if (!isPasswordValid) {
      return res.status(401).json({
        success: false,
        message: "Invalid password"
      });
    }

    // Generate token
    const accessToken = generateToken(user._id);

    // Set cookie
    res.cookie('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(200).json({
      success: true,
      data: {
        user: {
          _id: user._id,
          fullName: user.fullName,
          username: user.username,
          email: user.email,
          avatar: user.avatar
        },
        accessToken
      },
      message: "User logged in successfully"
    });

  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({
      success: false,
      message: "Something went wrong during login"
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    // Clear the accessToken cookie with all the same options used when setting it
    res.clearCookie('accessToken', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
      path: '/'
    });
    
    res.status(200).json({
      success: true,
      message: "User logged out"
    });
  } catch (error) {
    console.error('Logout error:', error);
    res.status(500).json({
      success: false,
      message: "Error during logout process"
    });
  }
};

// Get user profile
const getUserProfile = async (req, res) => {
  try {
    const user = req.user;
    
    res.status(200).json({
      success: true,
      data: {
        _id: user._id,
        fullName: user.fullName,
        username: user.username,
        email: user.email,
        avatar: user.avatar
      },
      message: "User fetched successfully"
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: "Error fetching user profile"
    });
  }
};

// Search users - MODIFIED to include current user in results
const searchUsers = async (req, res) => {
  try {
    const { searchTerm } = req.query;

    if (!searchTerm) {
      return res.status(400).json({
        success: false,
        message: "Search term is required"
      });
    }

    // Include current user in search results (removed the exclusion)
    const users = await User.find({
      $or: [
        { username: { $regex: searchTerm, $options: 'i' } },
        { email: { $regex: searchTerm, $options: 'i' } },
        { fullName: { $regex: searchTerm, $options: 'i' } }
      ]
    }).select('-password');

    res.status(200).json({
      success: true,
      data: users,
      message: "Users fetched successfully"
    });

  } catch (error) {
    console.error('Search users error:', error);
    res.status(500).json({
      success: false,
      message: "Error searching users"
    });
  }
};

module.exports = {
  registerUser,
  loginUser,
  logoutUser,
  getUserProfile,
  searchUsers
};
