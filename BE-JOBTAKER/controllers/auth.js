import { Router } from "express";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { User } from "../models/User.js";

export const authRouter = Router();

authRouter.post("/register", async (req, res) => {
  console.log(req.body);
  try {
    const { name, email, password, role } = req.body;
    if (!password || password.length < 6) {
      return res
        .status(400)
        .json({ error: "Password must be at least 6 characters" });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await User.create({
      password: hashedPassword,
      email: email.toLowerCase().trim(),
      name: name.trim(),
      role: "jobseeker",
    });

    res.status(201).json(user);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

authRouter.post("/login", async (req, res) => {
  console.log(req.body,'body payload');
  const { email, password } = req.body;
  const user = await User.findOne({ where: { email } });
const role = user.role;
const userId = user.id;

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "Invalid credentials" });
  }

  const token = jwt.sign(
    { id: user.id, role: user.role },
    process.env.JWT_SECRET
  );
  res.json({ token, role, userId });
});
