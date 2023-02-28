import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import dotenv from 'dotenv';
import User from "../models/user.js";

dotenv.config();
const SECRET_KEY = process.env.SECRET_KEY;
export const signin = async (req, res) => {
  const { email, password } = req.body;
  try {
    const existingUser = await User.findOne({ email });
  
    if (!existingUser)
      return res.status(404).json({ message: "User doesn`t exist" });
    const isPasswordCorrect = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (!isPasswordCorrect)
      return res.status(400).json({ message: "Invalid crediantials" });
    const token = jwt.sign(
      { email: existingUser.email, id: existingUser._id },
      SECRET_KEY,
      { expiresIn: "1h" }
    );
    res.status(200).json({ result: existingUser, token });
  } catch (error) {
    res.status(500).json({ message: "Something went wrong" });
  }
};

export const signup = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;
  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: "User already exists." });
    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password does not matched" });
    const hashedPassword = await bcrypt.hash(password, 12);
    const result = await User.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });
    // console.log(result);
    const token = jwt.sign({ email: result.email, id: result._id }, SECRET_KEY, {
      expiresIn: "1h",
    });
    res.status(200).json({ result: result, token });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Something went wrong" });
  }
};

