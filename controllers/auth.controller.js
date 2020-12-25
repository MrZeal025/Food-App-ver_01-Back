const { AuthService } = require('../services')
const authService = new AuthService();

/**
 * @route /api/auth/register
 * @param { fullName, email, password } req 
 */
exports.register = async (req, res) => {

    const { fullName, email, password } = req.body

    try {
        const register = await authService.register(fullName, email, password);
        if(register.success){
            return res.status(200).send(register);
        }else {
            return res.status(400).send(register);
        }
    } 
    catch (err) {
        throw err
    }
};

/**
 * @route /api/auth/login
 * @param { email, password } req 
 */
exports.login = async (req, res) => {

    const { email, password } = req.body; 
   
     try {
        const login = await authService.multiLogin(email, password);
        if(login.success){
            return res.status(200).send(login);
        }else {
            return res.status(400).send(login);
        }
    } 
    catch (err) {
        throw err
    }

};

exports.verify = async (req, res) => {
    try {
        const verify = await authService.verify(req.params.id);
        if(verify.success) {
            return res.redirect(process.env.NODE_ENV === "production" ? process.env.HEROKU_URI  : process.env.clientURL + `/register/${verify._id}/s/confirmed`)
        }
        else {
            return res.status(400).send(verify)
        }
    }
    catch(err) {
        throw err
    }
}