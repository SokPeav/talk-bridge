import { sendWelcomeEmail } from "../email/emailHandlers.js";
import { generateToken } from "../lib/utils.js";
import User from "../models/User.js";
import bcrypt from "bcryptjs";
import "dotenv/config"

export const signup = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    if (!name || !email || !password) {
      res.status(400).json({ message: "All field are required" });
    }

    if (password.length < 6) {
      res.status(400).json({ message: "At least longer then 6" });
    }

    const existEmail = await User.findOne({ email: email });
    if (existEmail) {
      res.status(400).json({ message: "This Email Already Exist" });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      name,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const saveUser = await newUser.save();
      generateToken(saveUser._id, res);
      res.status(201).json({
        _id: newUser._id,
        name: newUser.name,
        email: newUser.email,
        profilePic: newUser.profilePic,
      });


      try {
        await sendWelcomeEmail(saveUser.email,saveUser.name,process.env.CLIENT_URL)
      } catch (error) {
        console.log(error)
      }
    } else {
      res.status(400).json({ message: "Invalid User" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server 500" });
  }
};
