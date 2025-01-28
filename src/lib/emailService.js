import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
    },
});

const sendEmail = async ({ to, subject, text }) => {
    const mailOptions = {
        from: process.env.EMAIL_USER,
        to,
        subject,
        html: text,
    };


    try {
        await transporter.sendMail(mailOptions);
        return {data:"success",error:null};
    } catch (error) {
        return {data:null,error};
    }
};

export default sendEmail;
