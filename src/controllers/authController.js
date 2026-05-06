const User = require("../models/User.model");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const register = async (req, res) => {
  try {
    const { username, password } = req.body;
    const salt = await bcrypt.genSalt(10);

    const hashedPassword = await bcrypt.hash(password, salt);
    console.log("Hashed password is:", hashedPassword);
    const newUser = new User({
      username,
      password: hashedPassword,
    });

    await newUser.save();
    res.status(201).json({
      message: "User created successfully!!",
    });
  } catch (error) {
    res.status(500).json({
      error: error.message,
    });
  }
};

const login = async (req, res) => {
  try {
    const { username, password } = req.body;

    const user = await User.findOne({ username });
    if (!user)
      return res.status(404).josn({
        message: "User not found",
      });
    const isMatch = await bcrypt.compare(password, hashedPassword);
    if (!isMatch)
      return res.status(400).json({
        message: "Invalid credentials",
      });

    const token = jwt.sign(
        { id: user._id },
         process.env.JWT_SECRET,
          {expiresIn: '1h'});
          res.json({ message: "Login successful!", token });
  } catch (error) {
    res.status(500).json({
        error: error.message
    })
  }
};

module.exports = { register, login };
