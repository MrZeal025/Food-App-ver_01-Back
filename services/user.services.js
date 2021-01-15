//  models
const { User } = require('../models');
const { NOT_FOUND } = require('../messages/event.response');

/**
 * Module User
 * CRUD service
 * Handles the reading, updating of User
 */
class UserService {

    constructor () {
        // . . .
    }
    /**
     * Register a user
     * @param { String } fullName
     * @param { String } email
     * @param { String } password
     * @returns { Object <{ status: Boolean, data: Object, accessToken: String}>}
     * This tokens will be used for authorizatoin
     */
    async readOneUser(id) {

        try {
            // find duplicate
            const user = await User.findById(id);
            if(!user) return { success: false, data: {message: `User ${NOT_FOUND}` }}

            return { success: true, data: user}
        }
        catch(err) {
            return { success: false, data: { error: err.errors}} 
        }
    }
}

module.exports = UserService;