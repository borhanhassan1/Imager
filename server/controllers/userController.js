import userModel from "../models/userModel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
      return res.json({ status: false, message: "Missing Details" });
    }
    const salt = await bcrypt.genSaltSync(10);
    const hashedPassword = await bcrypt.hash(password, salt);
    const userData = {
      name,
      email,
      password: hashedPassword,
    };
    const newUser = new userModel(userData);
    const user = await newUser.save();
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
    res.json({ status: true, token, user: { name: user.name } });
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { name, password } = req.body;
    const user = await userModel.findOne({ name });
    if (!user) {
      return res.json({ status: false, message: "User does not exist" });
    }
    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      return res.json({ status: true, token, user: { name: user.name } });
    } else {
      return res.json({ status: false, message: "Invalid Credentials" });
    }
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: err.message });
  }
};

const credit = async (req, res) => {
  try {
    const { userId } = req.body;
    console.log(userId);
    const user = await userModel.findById(userId);
    res.json({
      status: true,
      credit: user.creditBalance,
      user: { name: user.name },
    });
  } catch (err) {
    console.log(err);
    res.json({ status: false, message: err.message });
  }
};

export { register, login, credit };
