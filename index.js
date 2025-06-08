import  express from "express"
import cors from "cors"
import dotenv from "dotenv"
dotenv.config()
import cookieParser from "cookie-parser"
import morgan from "morgan"
import helmet from 'helmet';
import connectDB from "./config/connectDB.js"
import userRoute from "./routes/user.route.js"
const app = express();

app.use(cors({
    credentials : true,
    origin : process.env.FRONTEND_URL
}))

app.use(express.json())
app.use(cookieParser())
app.use(morgan())
app.use(helmet({
    crossOriginResourcePolicy : false
}))


const PORT = 5000 || process.env.PORT

app.get("/",(req ,res)=>{
    // server to clint 
    res.json({
        message:"Server is running in 5000"
    })

})

app.use("/api/user", userRoute)


connectDB().then(()=>{
app.listen(PORT, () => {
  console.log(`server is running on the port ${PORT}`);
})
})




