import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import User from './models/User.js';
import dotenv from 'dotenv';
import path from 'path';

// Force look for .env in the root folder
dotenv.config({ path: path.resolve(process.cwd(), '.env') });

const seedAdmin = async () => {
    try {
        const mongoUri = process.env.MONGO_URI;
        if (!mongoUri) throw new Error("MONGO_URI not found!");

        await mongoose.connect(mongoUri);
        console.log("Connected to MongoDB...");

        const hashedPassword = await bcrypt.hash('David12$', 10);

        const admin = await User.findOneAndUpdate(
            { email: 'admin@mybank.com' },
            { 
                firstName: 'Main', 
                lastName: 'Admin', 
                email: 'Pauldare717@gmail.com', 
                password: hashedPassword, 
                role: 'admin' 
            },
            { upsert: true, new: true }
        );

        console.log('✅ Admin is ready! Email: Pauldare717@gmail.com | Pass: David12$');
        process.exit();
    } catch (err) {
        console.error("❌ Error:", err.message);
        process.exit(1);
    }
};

seedAdmin();
