import userModel from "../models/userModel.js";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import validator from "validator";

// Login User
const loginUser = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await userModel.findOne({ email });

    if (!user) {
      return res.status(404).json({ success: false, message: "User doesn't exist" });
    };

    // Special handling for admin user
    if (email === 'admin@gmail.com') {
      if (password !== 'admin@123') {
        return res.status(400).json({ success: false, message: "Invalid admin credentials" });
      }
      // If admin credentials are correct, return admin user
      const token = createToken('admin');
      return res.status(200).json({ 
        success: true, 
        token, 
        name: 'Admin',
        email: 'admin@gmail.com',
        isAdmin: true 
      });
    }

    // Regular user login
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid  Login, Please Try Again!" });
    };

    const token = createToken(user._id);

    res.status(200).json({ 
      success: true, 
      token, 
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin 
    });

  } catch (error) {
    console.error(error);  
    res.status(500).json({ success: false, message: "Error occurred during login", error: error.message });
  }
};


// Create token
const createToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET);
};


// Register User
const registerUser = async (req, res, next) => {
  const { name, password, email } = req.body;
  try {
    // Checking if user already exists
    const exists = await userModel.findOne({ email });
    if (exists) {
      return res.status(400).json({ success: false, message: "User already exists" });
    }

    // Validating email format & strong password
    if (!validator.isEmail(email)) {
      return res.status(400).json({ success: false, message: "Please enter a valid email" });
    }

    if (password.length < 8) {
      return res.status(400).json({ success: false, message: "Please enter a strong password" });
    }

    // Hashing user password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new userModel({
      name: name,
      email: email,
      password: hashedPassword,
    });

    const user = await newUser.save();
    const token = createToken(user._id);
    res.status(201).json({ success: true, token });

  } catch (error) {
    console.log(error);
    res.status(500).json({ success: false, message: "Error registering user", error: error.message });
  }
};

export { loginUser, registerUser };
