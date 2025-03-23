import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { createUser, getUserByUsername, findOrCreateUser } from "../models/userModel.js";

const saltRounds = 10;
const jwtSecret = process.env.JWT_SECRET || "your_jwt_secret";

// Sign up - Đăng ký
export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    const hashedPassword = await bcrypt.hash(password, saltRounds);
    const newUser = await createUser(username, hashedPassword);
    res.status(201).json({ message: "User registered", user: newUser });
  } catch (error) {
    res.status(500).json({ message: "Error registering user", error });
  }
};

// Sign in - Đăng nhập
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    const user = await getUserByUsername(username);
    if (!user) return res.status(400).json({ message: "User not found" });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ message: "Invalid password" });

    const token = jwt.sign({ id: user.id, username: user.username, role: user.role }, jwtSecret, { expiresIn: "48h" });
    res.json({ token , id: user.id , role:user.role  });
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
};


// ___ OAuth ___
// Google
export const googleCallback = async (req, res) => {
  const user = await findOrCreateUser(req.user); // req.user chính là Googleuser 
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '48h' }
  );

  res.redirect(process.env.FRONT_END_URL + `/login/success?token=${token}&username=${user.username}&userid=${user.id}&role=${user.role}`);
};
export const facebookCallback = async(req, res) => {
  const user = await findOrCreateUser(req.user);
  const token = jwt.sign(
    {
      id: user.id,
      username: user.username,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: '48h' }
  );

  res.redirect(`${process.env.FRONT_END_URL}/login/success?token=${token}&username=${user.username}&userid=${user.id}&role=${user.role}`);
};