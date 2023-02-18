import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import nodemailer from 'nodemailer';
import db from '../models';

var salt = bcrypt.genSaltSync(10);
dotenv.config();
const User = db.User;

const handleLogin = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Tìm kiếm user trong database
    const user = await User.findOne({ where: { email: email } });

    // Kiểm tra xem email của user có tồn tại không
    if (!user) {
      return res.status(401).json({ error: 'Invalid email' });
    }

    // Kiểm tra xem password của user có đúng không
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      return res.status(401).json({ error: 'Invalid password' });
    }

    // Tạo JSON Web Token cho user
    const token = jwt.sign(
      {
        email: user.email,
        firstName: user.firstName,
        lastName: user.lastName,
        phoneNumber: user.phoneNumber,
        gender: user.gender,
        address: user.address,
        image: user.image,
        role: user.role,
        birthday: user.birthday,
      },
      process.env.JWT_SECRET,
    );

    // Trả về token cho user
    return res.json({ token });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

const createUser = async (req, res) => {
  try {
    console.log(req.body);
    const { email, password, firstName, lastName, role, phoneNumber, gender, address, image } = req.body;

    // Tìm kiếm user trong database
    const user = await User.findOne({ where: { email } });

    // Kiểm tra xem email của user có tồn tại không
    if (user) {
      return res.status(422).json({ error: 'Email already exists' });
    }

    // hash password
    let hashPass = await bcrypt.hashSync(password, salt);

    await User.create({
      email,
      password: hashPass,
      firstName,
      lastName,
      role,
      phoneNumber,
      gender,
      address,
      image,
    });

    return res.status(200).json({ message: 'User created successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

const forgotPassword = async (req, res) => {
  try {
    const { email } = req.body;
    // check if user exists
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Invalid email' });
    }

    // generate token and save it to user's resetToken field
    const token = jwt.sign({ email }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.resetPasswordToken = token;
    user.resetPasswordExpires = Date.now() + 3600000;
    await user.save();

    // send email with reset password link
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.EMAIL_ADDRESS,
        pass: process.env.EMAIL_PASSWORD,
      },
    });

    const resetPasswordLink = `${req.headers.referer}reset-password/${token}`;

    const mailOptions = {
      from: process.env.EMAIL_ADDRESS,
      to: user.email,
      subject: 'Password reset',
      text: `You are receiving this because you (or someone else) have requested the reset of the password for your account.\nPlease click on the following link, or paste this into your browser to complete the process:\n${resetPasswordLink} \nIf you did not request this, please ignore this email and your password will remain unchanged.\n`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(500).json({ message: 'Failed to send email' });
      } else {
        return res.status(200).json({ message: `An email has been sent to ${user.email} with further instructions.` });
      }
    });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

const resetPassword = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;
    const { email } = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findOne({ where: { email } });
    if (!user) {
      return res.status(404).json({ error: 'Email not found' });
    }

    console.log(user.resetPasswordToken !== token);
    if (user.resetPasswordToken !== token || !user.resetPasswordExpires || user.resetPasswordExpires <= new Date()) {
      return res.status(400).json({ error: 'Invalid or expired token' });
    }

    const hashedPassword = await bcrypt.hash(password, salt);
    const dataUpdate = { password: hashedPassword, resetPasswordToken: null, resetPasswordExpires: null };
    await user.set(dataUpdate);
    await user.save();
    res.status(200).json({ message: 'Password reset successfully' });
  } catch (error) {
    console.log(123);
    return res.status(400).json({ error: 'Invalid or expired token' });
  }
};

const getUser = async (req, res) => {
  try {
    const { id } = req.body;
    if (id) {
      const user = await User.findOne({ where: { id }, attributes: { exclude: ['password'] } });
      if (!user) {
        return res.status(404).json({ error: 'User does not exist' });
      }
      return res.status(200).json({ user });
    }
    const user = await User.findAll({ attributes: { exclude: ['password'] }, order: [['createdAt', 'DESC']] });
    return res.status(200).json({ user });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

const updateUserById = async (req, res) => {
  console.log(req.body);
  const dataUpdate = req.body;
  try {
    const user = await User.findOne({ where: { id: dataUpdate.id } });
    if (!user) {
      return res.status(404).json({ error: 'User does not exist' });
    }
    const { id, ...data } = dataUpdate;
    await user.set(data);
    await user.save();
    return res.status(200).json({ message: 'User updated successfully' });
  } catch (error) {
    console.log(error, dataUpdate.id);
    return res.status(500).json({ error: 'Server error' });
  }
};

const deleteUserById = async (req, res) => {
  try {
    const { id } = req.body;
    const user = await User.findOne({ where: { id } });
    if (!user) {
      return res.status(404).json({ error: 'User does not exist' });
    }
    await user.destroy();
    return res.status(200).json({ message: 'User deleted successfully' });
  } catch (error) {
    return res.status(500).json({ error: 'Server error' });
  }
};

export default {
  handleLogin,
  createUser,
  forgotPassword,
  resetPassword,
  getUser,
  updateUserById,
  deleteUserById,
};
