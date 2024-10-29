// import nodemail from "nodemailer";
// import dotenv from "dotenv";
// export const transporter = nodemail.createTransport({
//         service: "gmail",
//         auth: {
//             user: process.env.MY_EMAIL,
//             pass: process.env.MY_EMAIL_PASSWORD
//         }
//     });
// export const sendMail = async (to: string, subject: string, text: string) => {
//     const mailOptions = {
//         from: process.env.MY_EMAIL,
//         to: to,
//         subject: subject,
//         text: text
//     };
//       await transporter.sendMail(mailOptions, (error: any, info: any) => {
//         if (error) {
//             console.log(error);
//         } else {
//             console.log("Email sent: " + info.response);
//         }
//     });
// }

import nodemailer from 'nodemailer';
import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

// Check for email credentials
if (!process.env.MY_MAIL || !process.env.MY_MAIL_PASSWORD) {
    console.error('Missing email credentials in environment variables');
    process.exit(1);
}

// Create Nodemailer transporter
export const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.MY_MAIL, // Your email address
        pass: process.env.MY_MAIL_PASSWORD, // Your email password or app-specific password
    },
});

// Function to send email
export const sendEmail = async (to: string, subject: string, html: string) => {
    const mailOptions = {
        from: process.env.MY_MAIL,
        to,
        subject,
        html,
    };

    try {
        await transporter.sendMail(mailOptions);
        console.log('Email sent successfully');
    } catch (error) {
        console.error('Failed to send email:', error);
    }
};

