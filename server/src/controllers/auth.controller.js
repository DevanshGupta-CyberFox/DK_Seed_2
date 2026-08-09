import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

function signToken(user) {
  return jwt.sign({ id: user._id, email: user.email, role: user.role }, process.env.JWT_SECRET, {
    expiresIn: '7d',
  });
}

function setAuthCookie(res, token) {
  res.cookie('token', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax',
    maxAge: 7 * 24 * 60 * 60 * 1000,
  });
}

export async function login(req, res) {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ message: 'Email and password are required' });
  }

  const user = await User.findOne({ email: email.toLowerCase().trim() });
  if (!user) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const match = await bcrypt.compare(password, user.passwordHash);
  if (!match) {
    return res.status(401).json({ message: 'Invalid email or password' });
  }

  const token = signToken(user);
  setAuthCookie(res, token);
  res.json({ id: user._id, email: user.email, role: user.role });
}

export function logout(req, res) {
  res.clearCookie('token');
  res.json({ message: 'Logged out' });
}

export async function me(req, res) {
  const user = await User.findById(req.user.id).select('-passwordHash');
  if (!user) {
    return res.status(401).json({ message: 'Not authenticated' });
  }
  res.json(user);
}
