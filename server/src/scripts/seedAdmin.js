import 'dotenv/config';

import bcrypt from 'bcryptjs';
import { connectDB } from '../config/db.js';
import User from '../models/User.js';
import mongoose from 'mongoose';

async function seed() {
  const email = process.env.ADMIN_EMAIL;
  const password = process.env.ADMIN_PASSWORD;

  if (!email || !password) {
    console.error('ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env');
    process.exit(1);
  }

  await connectDB();

  const passwordHash = await bcrypt.hash(password, 10);

  const user = await User.findOneAndUpdate(
    { email: email.toLowerCase().trim() },
    { email: email.toLowerCase().trim(), passwordHash, role: 'admin' },
    { upsert: true, new: true }
  );

  console.log(`Admin user ready: ${user.email}`);
  await mongoose.disconnect();
  process.exit(0);
}

seed().catch((err) => {
  console.error(err);
  process.exit(1);
});
