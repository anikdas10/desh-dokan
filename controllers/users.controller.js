import sendEmail from "../config/resendEmail.js";
import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utilities/verifyEmailTemplate.js";
import dotenv from "dotenv";
dotenv.config()

export const registerUserController =async (req , res)=>{
    try {
        const {name , email , password} = req.body ;
        if (!name || !email || !password)
            {
               return res.status(400).json({
                    message : "Provide name , email and password.",
                    error : true, 
                    success : false
                })
            } 

        const user = await userModel.findOne({email})
        
        if(user)
        {
            return res.json({
                message : "Already register email.",
                error: true,
                success: false
            })
        }
    
    // converting password in bcrypt
    const salt = await bcryptjs.genSalt(10)
    const hashPassword = await bcryptjs.hash(password , salt)

    // store in database
    const payload = {
        name ,
        email,
        password : hashPassword
    }

    const newUser  = new userModel(payload)
    const save = await newUser.save();

    const verifyEmailUrl = `${process.env.FRONTEND_URL}/verify-email?code=${save._id}`;
   

    const verificationEmail = await sendEmail({
        sendTo : email,
        subject : "Verify email from DeshDokan",
        html : verifyEmailTemplate({
            name : name,
            url : verifyEmailUrl
        })
 
    })

    // console.log("this is from user controller" , verificationEmail);

    return res.json({
        message: "Registration successFull. ",
        error : false ,
        success : true ,
        data : save
    })

    } catch (error) {
        return res.status(500).json({
            message: error.message || error,
            error : true,
            success : false
        })
    }
}