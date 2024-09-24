const User = require("../models/user.models");
const { use } = require("../routes/user.routes");

// Update Profile Function
const updateProfile = async (req, res) => {
  const { fullName, phoneNo, password, enrollmentNo, _id } = req.body;

  try {
    // Validate required fields
    if ((!fullName && !phoneNo) || !password) {
      return res.status(400).json({ message: 'Full name, phone number, and password are required' });
    }

    // Authenticate user by checking password
    const token = await User.matchPasswordAndGenerateToken(enrollmentNo, password);

    // Build the update object conditionally (only if the values are not empty strings)
    const updateData = {};
    if (fullName && fullName.trim() !== '') {
      updateData.fullName = fullName.trim().toLowerCase();
    }
    if (phoneNo && phoneNo.trim() !== '') {
      updateData.phoneNo = phoneNo.trim();
    }

    // If no valid update data, return an error
    if (Object.keys(updateData).length === 0) {
      return res.status(400).json({ message: 'No valid data to update' });
    }

    // Update the user's profile
    const updatedUser = await User.findByIdAndUpdate(
      _id,
      updateData,
      { new: true, runValidators: false } // Returns the updated user, skips validation
    );

    if (!updatedUser) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Send back the updated user data with token
    res.status(200).json({ user: updatedUser, token });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// Update Password Function
const updatePassword = async (req, res) => {
  const { password, newPassword,enrollmentNo, _id } = req.body;
  
  // console.log("user in update password",req.user);

  // const { enrollmentNo, _id } = req.user;

  try {
    // Validate fields
    if(!enrollmentNo || !_id )
    if (!password || !newPassword || password.trim() === '' || newPassword.trim() === '') {
      return res.status(400).json({ message: 'Current password and new password are required' });
    }

    // Authenticate user by checking current password
    const token = await User.matchPasswordAndGenerateToken(enrollmentNo, password);

    // Find the user by ID
    const user = await User.findById(_id);
    if (!user) {
      console.log('!user in update password', user);
      return res.status(404).json({ message: 'User not found' });
    }

    // Update the user's password
    user.password = newPassword;

    // Save the updated password
    await user.save();

    // Send success response with a new token
    res.status(200).json({ message: 'Successfully updated password', token, user});

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

module.exports = { updateProfile, updatePassword };
