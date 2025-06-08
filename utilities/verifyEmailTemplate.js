
const verifyEmailTemplate = ({name , url})=>{
    return `
    <h1 style="color: #333333;">Verify Your Email Address</h1>
    <p style="font-size: 16px; color: #666666;">Hi ${name},</p>

    <p style="font-size: 16px; color: #666666;">Thanks for registering DeshDokan ! Please confirm your email address by clicking the button below:</p>
    
    <a href="${url}" 
       style="display: inline-block; margin-top: 20px; padding: 12px 25px; background-color: #007bff; color: #ffffff; text-decoration: none; border-radius: 5px; font-weight: bold;">
      Verify Email
    </a>
    `;
}

export default verifyEmailTemplate