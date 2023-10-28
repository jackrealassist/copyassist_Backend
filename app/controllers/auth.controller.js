const config = require("../config/auth.config");
const db = require("../models");
const User = db.user;
const Role = db.role;

var jwt = require("jsonwebtoken");
var bcrypt = require("bcryptjs");
const nodemailer = require("nodemailer");
const crypto = require("crypto");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "bhavya.popat.8@gmail.com",
    pass: "hqtk rnnn oqji vxki",
  },
});

exports.signup = (req, res) => {
  const user = new User({
    username: req.body.username,
    email: req.body.email,
    password: bcrypt.hashSync(req.body.password, 8),
  });

  user.save((err, user) => {
    if (err) {
      res.status(500).send({ message: "User Already Exist... " });
      return;
    }

    if (req.body.roles) {
      Role.find(
        {
          name: { $in: req.body.roles },
        },
        (err, roles) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          user.roles = roles.map((role) => role._id);
          user.save((err) => {
            if (err) {
              res.status(500).send({ message: err });
              return;
            }

            res.send({ message: "User was registered successfully!" });
          });
        }
      );
    } else {
      Role.findOne({ name: "user" }, (err, role) => {
        if (err) {
          res.status(500).send({ message: err });
          return;
        }

        user.roles = [role._id];
        user.save((err) => {
          if (err) {
            res.status(500).send({ message: err });
            return;
          }

          res.send({ message: "User was registered successfully!" });
        });
      });
    }
  });
};

exports.signin = (req, res) => {
  User.findOne({
    email: req.body.email,
  })
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: "User Already Exist... " });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      var passwordIsValid = bcrypt.compareSync(req.body.password, user.password);

      if (!passwordIsValid) {
        return res.status(401).send({
          accessToken: null,
          message: "Invalid Password!",
        });
      }

      const token = jwt.sign({ id: user.id }, config.secret, {
        algorithm: "HS256",
        allowInsecureKeySizes: true,
        expiresIn: 86400, // 24 hours
      });

      var authorities = [];

      for (let i = 0; i < user.roles.length; i++) {
        authorities.push("ROLE_" + user.roles[i].name.toUpperCase());
      }
      res.status(200).send({
        id: user._id,
        username: user.username,
        email: user.email,
        roles: authorities,
        accessToken: token,
      });
    });
};

exports.getProfile = (req, res) => {
  const userId = req.body.userId; // Assuming you pass the user ID in the request parameters

  User.findById(userId)
    .populate("roles", "-__v")
    .exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }

      // If the user is found, you can send the user data as a response
      res.status(200).send({ user });
    });
};

exports.setProfile = (req, res) => {
  const userId = req.body.userId; // Assuming you pass the user ID in the request parameters

  // Create an object with the fields you want to update
  const updatedProfile = {};

  if (req.body.email) {
    updatedProfile.email = req.body.email;
  }

  if (req.body.password) {
    updatedProfile.password = bcrypt.hashSync(req.body.password, 8); // Hash the new password
  }

  // Update the user document by ID
  User.findByIdAndUpdate(userId, updatedProfile, { new: true }).exec((err, user) => {
    if (err) {
      res.status(500).send({ message: err });
      return;
    }

    if (!user) {
      return res.status(404).send({ message: "User Not found." });
    }

    // If the user is updated successfully, send the updated user data as a response
    res.status(200).send({ user });
  });
};

exports.forgotPasswordPage = (req, res) => {
  const filePath = path.join(__dirname, "..", "public", "reset-password.html");
  res.sendFile(filePath);
};

exports.forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    const user = await User.findOne({ email: email });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Generate a unique token
    const token = crypto.randomBytes(32).toString("hex");

    // Save the updated user document
    await User.findByIdAndUpdate(
      user._id,
      { resetToken: token, resetTokenExpiration: Date.now() + 3600000 }, // Token expires in an hour
      { new: true }
    ).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }

      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
    });

    // Send the password reset email with the token link
    const resetLink = `http://localhost:7000/api/auth/forgotPassword?token=${token}`;
    const mailOptions = {
      from: "bhavya.popat.8@gmail.com",
      to: user.email,
      subject: "RealAssist Password Reset",
      html: `<p style="font-size:1.125rem;">Click the following link to reset your password:</p><a style="font-size:1.125rem;" href="${resetLink}">Reset Password</a>`,
    };

    await transporter.sendMail(mailOptions, (error, info) => {
      if (error) {
        console.error("Error sending email:", error);
        return res.status(500).json({ message: "Email sending failed" });
      } else {
        return res.status(200).json({ message: "Password reset email sent" });
      }
    });
  } catch (err) {
    console.log(err);
    return res.status(500).send(err);
  }
};
exports.resetPassword = async (req, res) => {
  try {
    const { token, newPassword } = req.body;
    const user = await User.findOne({
      resetToken: token,
      resetTokenExpiration: { $gt: Date.now() },
    });

    if (!user) {
      return res.status(401).json({ message: "Invalid or expired token" });
    }

    const id = user._id;
    const newHashedPassword = bcrypt.hashSync(newPassword, 8);

    // Save the updated user document
    await User.findByIdAndUpdate(
      user._id,
      { password: newHashedPassword, resetToken: null, resetTokenExpiration: null },
      { new: true }
    ).exec((err, user) => {
      if (err) {
        res.status(500).send({ message: err });
        return;
      }
      if (!user) {
        return res.status(404).send({ message: "User Not found." });
      }
    });

    return res.status(200).json({ message: "Password reset successful" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: err.message });
  }
};
