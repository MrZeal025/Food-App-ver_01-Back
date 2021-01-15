const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
//  models
const { User, Admin } = require('../models');
// event responses
const {  REGISTER_SUCCESS, EXIST_ERROR, LOGIN_FAIL,  REGISTER_FAILS } = require('../messages/event.response');
const mailer = require("../mail/mailer");

/**
 * Module Auth
 * Authentication/Authorization service
 * Handles the authentication, registration and authorization of users
 * Changing passwords, restricting/providing access
 */
class AuthService {

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
    async register(fullName, email, password) {

        email = email.toLowerCase();
        password = await bcrypt.hash(password, 10);

        // find duplicate
        const userExist = await User.findOne({ email: email });
        if(userExist) return { success: false, data: {message: `User ${EXIST_ERROR}` }}

        // set input to schema
        const user = new User({
            fullName: fullName,
            email: email,
            password: password
        });

        try {
            await user.save();
            const registerToken = `Bearer ${jwt.sign({ _id : user._id, verified: false }, process.env.ACCESS_TOKEN_SECRET)}`;
            // mailing purposes
            const html = `Hello,<br/>Please verify by clicking this link: <a href="${ process.env.NODE_ENV === "production" ? process.env.HEROKU_URI  : process.env.verificationURL}/api/auth/verify/${user._id}">Verify Here!</a>`;
            await mailer.sendEmail("admin@yeah.com", email, "Verification Email", html);

            return { success: true, data: { message: REGISTER_SUCCESS }, registerToken: registerToken }
        }
        catch(err) {
            return { success: false, data: { error: err.errors, message: REGISTER_FAILS }} 
        }
    }

    /**
     * Multi Login for user or admin
     * @param { String } email
     * @param { String } password
     * @param { String } hashPassword
     * @returns { Object } 
     * This tokens will be used for authorizatoin
     */
    async multiLogin(email, password) {
        
        email = email.toLowerCase();

        // look up if user or admin
        const linearCheck = await Promise.all([User.findOne({ email: email }), Admin.findOne({ email: email })]);
        const isAdmin = linearCheck[1]
        const isUser = linearCheck[0]
        
        // checking if there is any match and deciding if proceed or not
        if(isAdmin === null && isUser === null) return { success: false, data: {message: LOGIN_FAIL}} 
        /**
         *  @param { linearCheck[0] } | User Data
         *  @param { decrypted password and matched }
         *  @returns { status: Boolean, data: String, accesstoken: String }
         */
        if(linearCheck[0] !== null && await bcrypt.compare(password, linearCheck[0].password)) {
            if (!linearCheck[0].validated) return {success: false, data: { message: "Please validate your email address first." }}
            const account = { 
                _id: linearCheck[0]._id,
                email: linearCheck[0].email, 
                type: linearCheck[0].type, 
                fullName: linearCheck[0].fullName,
                date: linearCheck[0].date, 
            }
            const accessToken = `Bearer ${jwt.sign(account, process.env.ACCESS_TOKEN_SECRET)}`
            return { success: true, data: { message: "Log in verified and successful" }, accessToken: accessToken }
        } 

        /**
         *  @param { linearCheck[1] } | Admin Data
         *  @param { decrypted password and matched }
         *  @returns { status: Boolean, data: String, accesstoken: String }
         */
        if(linearCheck[1] !== null && await bcrypt.compare(password, linearCheck[1].password)) {
            const account = { 
                _id: linearCheck[1]._id,
                email: linearCheck[1].email, 
                type: linearCheck[1].type, 
                fullName: linearCheck[1].fullName,
                date: linearCheck[1].date, 
            }
            const accessToken = `Bearer ${jwt.sign(account, process.env.ACCESS_TOKEN_SECRET)}`
            return { success: true, data: { message: "Log in verified and successful" }, accessToken: accessToken }

        } 
        return { success: false, data: { message: LOGIN_FAIL }}
    }

    async verify(id) {
        try {
            const verify = await User.findById(id);
            verify.validated = true;
            verify.save()
            return { success: true, _id: verify._id }
        }
        catch(err) {
            return { success: false, data: { error: err }}
        }
    }
}


module.exports = AuthService;