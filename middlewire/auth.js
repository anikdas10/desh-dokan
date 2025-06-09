import jwt from "jsonwebtoken"
const auth = (req,res,next)=>{
    try {
        const token = req.cookies.accessToken || req?.header?.authorization?.split(" ")[1]

        // console.log("Token",token);
        if(!token)
        {
            return res.status(401).json({
                message : "Provide Token",
            })
        }

        const decodeToken = jwt.verify(
          token,
          process.env.SECRET_KEY_ACCESS_TOKEN
        );

        if(!decodeToken)
        {
            return res.status(401).json({
                message : "Unauthorized Access",
                error : true,
                success : false  
            })   
        }

        req.userId = decodeToken._id
        // console.log("decode",decodeToken._id);
        next()
        
    } catch (error) {
       return res.status(500).json({
        message : error.message || error,
        error : true,
        success : false
       }) 
    }
}

export default auth