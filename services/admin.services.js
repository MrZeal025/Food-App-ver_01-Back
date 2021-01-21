//  models
const { Admin } = require('../models');
const { NOT_FOUND } = require('../messages/event.response');

/**
 * Module Admin
 * CRUD service
 * Handles the reading, updating of User
 */
class AdminService {

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
    async readOneAdmin(id) {

        try {
            // find duplicate
            const admin = await Admin.findById(id);
            if(!admin) return { success: false, data: {message: `Admin ${NOT_FOUND}` }}

            return { success: true, data: admin}
        }
        catch(err) {
            return { success: false, data: { error: err.errors}} 
        }
    }
}

module.exports = AdminService;