import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import userMessage from "../models/userMessages.js";

const secret = "test";

export const signUp = async (req, res) => {
  const { email, password, confirmPassword, firstName, lastName } = req.body;

  try {
    const existsUser = await userMessage.findOne({ email });

    if (existsUser) return res.status(400).json({ message: "User already exists." });

    if (password !== confirmPassword)
      return res.status(400).json({ message: "Password and confirm password doesn't match" });
    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await userMessage.create({
      email,
      password: hashedPassword,
      name: `${firstName} ${lastName}`,
    });

    const token = jwt.sign({ email: user.email, id: user._id }, secret, { expiresIn: "1h" });

    res.status(201).json({ ...user._doc, token });
  } catch (error) {
    console.log(error);
  }
};

export const signIn = async (req, res) => {
  const { email, password } = req.body;

  try {
    const findUser = await userMessage.findOne({ email });

    if (!findUser) return res.status(404).json({ message: "User doesn't exists" });

    const isPasswordCorrect = await bcrypt.compare(password, findUser.password);

    if (!isPasswordCorrect) return res.status(404).json({ message: "Invalid password" });

    const token = jwt.sign({ email: findUser.email, id: findUser._id }, secret, {
      expiresIn: "90d",
    });

    res.status(200).json({ ...findUser._doc, token });
  } catch (error) {
    console.log(error);
  }
};
