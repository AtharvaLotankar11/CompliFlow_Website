const mongoose = require('mongoose');
const User = require('../src/models/User');
require('dotenv').config({ path: '../.env' });

const updateUserRole = async () => {
    try {
        // Connect to MongoDB
        await mongoose.connect(process.env.MONGODB_URI);
        console.log('Connected to MongoDB');

        // Update Atharva's role to admin
        const user = await User.findOneAndUpdate(
            { email: 'atharvalotankar11@gmail.com' },
            { role: 'admin' },
            { new: true }
        );

        if (user) {
            console.log(`✅ Updated user role: ${user.name} (${user.email}) -> ${user.role}`);
        } else {
            console.log('❌ User not found');
        }

    } catch (error) {
        console.error('Error updating user role:', error);
    } finally {
        await mongoose.connection.close();
        console.log('Database connection closed');
    }
};

updateUserRole();