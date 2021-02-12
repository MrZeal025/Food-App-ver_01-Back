const { cloudinary } = require('../config/cloudinary');
const { User, Admin } = require('../models');

exports.uploadProfile = async (req, res) => {
    try {
        const fileStr = req.body.data 
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: "dev_setups"
        })
        const user = await User.findById(req.params.id);
        if(!user) return res.status(400).json({ success: false, data: { message: "User not found"} })    
        user.profilePicture = uploadedResponse.url
        await user.save();
        return res.status(200).json({ success: true, data: { message: "Profile picture updated successfully.", imageResponse: uploadedResponse }});
    } 
    catch (error) {
        console.log(error.response)
        return res.status(400).json({ success: false, data: { messsage: error.response }})
    }
}

exports.uploadAdminProfile = async (req, res) => {
    
    try {
        const fileStr = req.body.data 
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: "dev_setups"
        })
        const admin = await Admin.findById(req.params.id);
        if(!admin) return res.status(400).json({ success: false, data: { message: "User not found"} })    
        admin.profilePicture = uploadedResponse.url
        await admin.save();
        return res.status(200).json({ success: true, data: { message: "Profile picture updated successfully.", imageResponse: uploadedResponse }});
    } 
    catch (error) {
        console.log(error.response)
        return res.status(400).json({ success: false, data: { messsage: error.response }})
    }
}

exports.uploadCoverPhoto = async (req, res) => {
    try {
        const fileStr = req.body.data 
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: "dev_setups"
        })
        const user = await User.findById(req.params.id);
        if(!user) return res.status(400).json({ success: false, data: { message: "User not found"} })    
        user.backGroundPicture = uploadedResponse.url
        await user.save();
        return res.status(200).json({ success: true, data: { message: "Cover picture updated successfully.", imageResponse: uploadedResponse }});
    } 
    catch (error) {
        console.log(error.response)
        return res.status(400).json({ success: false, data: { messsage: error.response }})
    }
}

exports.uploadAdminCoverPhoto = async (req, res) => {
    
    try {
        const fileStr = req.body.data 
        const uploadedResponse = await cloudinary.uploader.upload(fileStr, {
            upload_preset: "dev_setups"
        })
        const admin = await Admin.findById(req.params.id);
        if(!admin) return res.status(400).json({ success: false, data: { message: "User not found"} })    
        admin.backGroundPicture = uploadedResponse.url
        await admin.save();
        return res.status(200).json({ success: true, data: { message: "Cover picture updated successfully.", imageResponse: uploadedResponse }});
    } 
    catch (error) {
        console.log(error.response)
        return res.status(400).json({ success: false, data: { messsage: error.response }})
    }
}

exports.createRecipeImage = async (req, res) => {
    
    try {
        const fileStr = req.body 
        let uploadedResponse = [];
        for(let i = 0; i < fileStr.length; i++) {
            let res = await cloudinary.uploader.upload(fileStr[i], {
                upload_preset: "dev_setups"
            })
            uploadedResponse.push(res)
        }
        return res.status(200).json({ success: true, data: { message: "Cover picture updated successfully.", imageResponse: uploadedResponse }});
    } 
    catch (error) {
        return res.status(400).json({ success: false, data: { messsage: error.response }})
    }
}




