import sendEmail from "../config/resendEmail.js";
import userModel from "../models/user.model.js";
import bcryptjs from "bcryptjs";
import verifyEmailTemplate from "../utilities/verifyEmailTemplate.js";
import dotenv from "dotenv";
import generateAccessToken from "../utilities/generateAcccessToken.js";
import generateRefreshToken from "../utilities/generateRefreshToken.js";
import { response } from "express";
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


export const verifyEmailController =async (req , res)=>{

    try {
        const {code} = req.body;

        const user = await userModel.findOne({_id : code})

        if(!user){
            return res.status(400).json({
                message: "Invalid code.",
                error : true,
                success : false
            })
        }

        const updateUser = await userModel.updateOne(
          { _id: code },
          {
            verify_email: true
        });

        return res.json({
            message : "Email verification completed.",
            error: false,
            success : true
        })
        
    } catch (error) {
        return res.status(500).json({
            message : error.message || error,
            error : true ,
            success : false
        })
    }
}

// login

export const loginController = async(req,res)=>{
    try {
        const {email , password } = req.body;

        if(!email || !password)
        {
            return res.status(400).json({
                message : "Provide Email and Password",
                error : true,
                success : false
            })
        }

        const user = await userModel.findOne({email})
        
        if(!user){
            return res.status(400).json({
                message : "User not register.",
                error : true,
                success : false
            })
        }

        if(user.status !== "Active")
        {
            return res.status(400).json({
                message : "Contact to admin",
                error : true,
                success : false
            })
        }


        // decript password 
        const checkPassword = await bcryptjs.compare(password , user.password);

        if(!checkPassword)
        {
            return res.status(400).json({
                message : "Invalid Password.",
                error : true,
                success : false
            })
        }

        const accessToken = await generateAccessToken(user._id);
        const refreshToken = await generateRefreshToken(user._id)


        const cookieOption = {
            httpOnly : true,
            secure : true,
            sameSite : "None"
        }
        res.cookie("accessToken",accessToken,cookieOption)
        res.cookie("refreshToken",refreshToken,cookieOption)

        return res.status(200).json({
            message : "Login successful.",
            error : false,
            success : true,
            data : {
                accessToken,
                refreshToken
            }
        })

        
    } catch (error) {
       return res.status(500).json({
        message : error.message || error,
        error : true,
        success : false
       }) 
    }
}

// logout

export const logoutController = async(req,res)=>{
    try {

        const userId = req.userId

        const cookieOption = {
          httpOnly: true,
          secure: true,
          sameSite: "None",
        };

        res.clearCookie("accessToken",cookieOption)
        res.clearCookie("refreshToken",cookieOption)

        // remove refresh token

        const removeRefreshToken = await userModel.findByIdAndUpdate(userId,{
            refresh_token : ""
        })
        
        
        return res.json({
            message : "Logout SuccessFully.",
            error : false,
            success : true
        })
    } catch (error) {
       return res.status(500).json({
        message : error.message || error,
        error : true ,
         success : false
       }) 
    }
}