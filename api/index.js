const express = require("express");
const mongoose = require("mongoose");
const nodemailer = require("nodemailer");
const bodyParser = require("body-parser");

const app = express();
const port = 8000;
const cors = require("cors");
app.use(cors({ origin: true, credentials: true }));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose
  .connect("mongodb+srv://kjha7865:1234@cluster0.mon3qjn.mongodb.net/", {})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((err) => {
    console.log("Error connecting to MongoDb", err);
  });

app.listen(port, () => {
  console.log("Server is running on port 8000");
});

const User = require("./models/user");

const sendVerificationEmail = async (email) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: "Kjha7865@gmail.com",
      pass: "gokb zppi idik iuvx",
    },
  });

  const mailOptions = {
    from: "Kaushal",
    to: email,
    subject: "Welcome To Our App",
    text: "Thank You For Registering",
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Verification email sent successfully");
  } catch (error) {
    console.error("Error sending verification email:", error);
  }
};

// Register a new user
app.post("/register", async (req, res) => {
  try {
    const { name, email, number } = req.body;

    const newUser = new User({ name, email, password });

    await newUser.save();

    console.log("New User Registered:", newUser);

    sendVerificationEmail(newUser.email);

    res.status(201).json({
      message: "Registration successful. Please check your email.",
    });
  } catch (error) {
    console.log("Error during registration:", error);
    res.status(500).json({ message: "Registration failed" });
  }
});
