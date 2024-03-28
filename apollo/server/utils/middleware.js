const { skip } = require('graphql-resolvers')
import { Role, User } from '@/lib/models';

// Auth User
const isAuthenticatedUser = async (_, args, { user }) => {
    try {
        const userData = await User.findById(user._id);
        if (!userData) {
            return new Error('Not authenticated');
        }

        const isRole = await Role.findById(userData.role);
        if (isRole.role === 'user') {
            skip
        } else {
            return new Error('Not authenticated User');
        }
    } catch (error) {
        console.error(error);
        return new Error('Not authenticated');
    }
}

// Auth Admin
const isAuthenticatedAdmin = async (_, args, { user }) => {
    try {
        const userData = await User.findById(user._id);
        if (!userData) {
            return new Error('Not authenticated');
        }

        const isRole = await Role.findById(userData.role);
        if (isRole.role === 'admin') {
            skip
        } else {
            return new Error('Not authenticated Admin');
        }
    } catch (error) {
        console.error(error);
        return new Error('Not authenticated');
    }
}

module.exports = {
    isAuthenticatedUser, isAuthenticatedAdmin
}