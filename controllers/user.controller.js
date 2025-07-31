import User from "../models/user.model.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const { name, username, email, password } = req.body;
  try {
    const existingUsername = await User.findOne({ username });
    const existingEmail = await User.findOne({ email });

    if (existingUsername && existingEmail) {
      return res
        .status(409)
        .json({ message: "Username and email already exist" });
    } else if (existingUsername) {
      return res.status(409).json({ message: "Username already exists" });
    } else if (existingEmail) {
      return res.status(409).json({ message: "Email already exists" });
    }

    const salt = await bcrypt.genSalt(12);
    const hashPassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      name,
      username,
      email,
      password: hashPassword,
    });
    await newUser.save();
    return res.status(201).json({ message: "User registered successfully. Please log in."});
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const login = async (req, res) => {
  const { username, password } = req.body;
  try {
    const user = await User.findOne({ username });
    if (!user) {
      return res
        .status(404)
        .json({ message: "User not found please register" });
    }
    const checkPassword = await bcrypt.compare(password, user.password);
    if (!checkPassword) {
      return res
        .status(401)
        .json({ message: "Invalid password please try again" });
    }
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });
    return res.status(200).json({
      message: "Login successfull",
      user: {
        name: user.name,
        username: user.username,
        email: user.email,
      },
      token: token,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

export const verify_token = (req, res) => {
  res.status(200).json({ message: "Token is valid", user: req.user });
};
