const { skip } = require('graphql-resolvers')
import { User } from '@/lib/models';

// Auth User
const isAuthenticatedUser = async (_, args, { user }) => {    
    try {
        const userData = await User.findById(user._id, { password: 0 });       
        if (!userData) {
            return new Error('Not authenticated1');
        }
        skip
    } catch (error) {
        console.error(error);
        return new Error('Not authenticated');
    }
}

// Auth Admin
const isAuthenticatedAdmin = async (_, args, { user }) => {
    console.log("🚀 ~ isAuthenticated ~ users:", user)
    try {
        const userData = await User.findById(user._id, { password: 0 });
        if (!userData) {
            throw new Error('Not authenticated1');
        }
        if (userData.role === 'admin') {
            skip
        } else {
            throw new Error('Not authenticated Admin');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Not authenticated2');
    }
}

module.exports = {
    isAuthenticatedUser, isAuthenticatedAdmin
}