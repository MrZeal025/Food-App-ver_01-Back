const multer = require("multer");
const { User } = require('../models');

const storage1 = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, process.env.MULTER_STORAGE_DESTINATION_PROFILE_PICTURE);
    },
    filename: (req, file, callback) => {
        const extension = file.originalname.split('.').pop()
        const processFileName = "xs.prcs." + file.originalname.split(' ').join('.').split('.').join('_') + "." + extension
        callback(null, processFileName);
    },
});

const storage2 = multer.diskStorage({
    destination: (req, file, callback) => {
        callback(null, process.env.MULTER_STORAGE_DESTINATION_COVER_PHOTO);
    },
    filename: (req, file, callback) => {
        const extension = file.originalname.split('.').pop()
        const processFileName = "xs.prcs." + file.originalname.split(' ').join('.').split('.').join('_') + "." + extension
        callback(null, processFileName);
    },
});

// filter image
const fileFilter = (req, file, callback) => {
    if(file.mimetype === 'image/jpeg' || file.mimetype === "image/png") {
        callback(null, true);
    }
    else {
        callback("Wrong file type has been uploaded...", false);
    }
}

var profileUpload = multer({ storage: storage1, limits: { fileSize: 1024 * 1024 * 20 }, fileFilter: fileFilter}).array('profilePicture');
var coverPhotoUpload = multer({ storage: storage2, limits: { fileSize: 1024 * 1024 * 20}, fileFilter: fileFilter }).array('coverPhoto');

exports.uploadProfile = async (req, res) => {
    
    profileUpload(req, res, async function (err) {

        // check if there is a errow on the multer process
        if (err instanceof multer.MulterError) {
            throw err
        } else if (err) {
            return res.status(400).json({ success: false, data: { messsage: err }})
        }
        // check if there is a file
        if(req.files.length === 0) return res.status(400).json({success: false, data: { messsage: "Profile picture is empty." }});
        
        // respond to the user call
        try {
            const user = await User.findById(req.params.id);
            if(!user) return res.status(400).json({ success: false, data: { message: "User not found"} })
            
            user.profilePicture = req.files[0].filename 
            await user.save();
            
            return res.status(200).json({ success: true, data: { message: "Profile picture updated successfully.", user: user.profilePicture }});
        } 
        catch (error) {
            return res.status(400).json({ success: false, data: { messsage: error.response }})
        }
    })
}

exports.uploadCoverPhoto = async (req, res) => {
    
    coverPhotoUpload(req, res, async function (err) {

        // check if there is a errow on the multer process
        if (err instanceof multer.MulterError) {
            throw err
        } else if (err) {
            return res.status(400).json({ success: false, data: { messsage: err }})
        }
        // check if there is a file
        if(req.files.length === 0) return res.status(400).json({success: false, data: { messsage: "Cover photo is empty." }});
        
        // respond to the user call
        try {
            const user = await User.findById(req.params.id);
            if(!user) return res.status(400).json({ success: false, data: { message: "User not found"} })
            
            user.backGroundPicture = req.files[0].filename 
            await user.save();
            
            return res.status(200).json({ success: true, data: { message: "Cover photo updated successfully.", user: user.backGroundPicture }});
        } 
        catch (error) {
            return res.status(400).json({ success: false, data: { messsage: error.response }})
        }
    })
}



