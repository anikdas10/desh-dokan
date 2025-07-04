import { Resend } from "resend";
import dotenv from "dotenv";

dotenv.config()

if(!process.env.RESEND_API)
{
    console.log("Provide the RESEND_API in the .env file");
}
const resend = new Resend(process.env.RESEND_API);

const sendEmail =async ({ sendTo , subject , html}) =>{
    try {
        const { data, error } = await resend.emails.send({
          from: "DeshDokan <onboarding@resend.dev>",
          to: sendTo,
          subject: subject,
          html: html,
        });

        
    //    console.log("this is from",error);
    if (error) {
      return console.error({ error });
    }

        return data

    } catch (error) {
        console.log("This is from resend email",error);
    }
}


export default sendEmail
