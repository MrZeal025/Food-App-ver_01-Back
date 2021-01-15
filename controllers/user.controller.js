const { UserService } = require('../services')
const userService = new UserService();

/**
 * @route /api/user/profile/read/:id
 * @param { fullName, email, password } req 
 */
exports.readOneProfile = async (req, res) => {

    const _id = req.params.id
    try {
        const getProfile = await userService.readOneUser(_id);
        if(getProfile.success){
            return res.status(200).send(getProfile);
        }else {
            return res.status(400).send(getProfile);
        }
    } 
    catch (err) {
        throw err
    }
};
