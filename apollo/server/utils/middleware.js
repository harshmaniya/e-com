const { skip } = require('graphql-resolvers')
import { Role, User } from '@/lib/models';

// Auth User
const isAuthenticatedUser = async (_, args, { user }) => {    
    try {
        const userData = await User.findById(user._id, { password: 0 });       
        if (!userData) {
            return new Error('Not authenticated');
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
            throw new Error('Not authenticated');
        }
        const isRole = await Role.findById({ _id: userData.role });
        if (isRole.name === 'admin') {
            skip
        } else {
            throw new Error('Not authenticated Admin');
        }
    } catch (error) {
        console.error(error);
        throw new Error('Not authenticated');
    }
}

module.exports = {
    isAuthenticatedUser, isAuthenticatedAdmin
}