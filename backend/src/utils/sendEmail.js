const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
    try {
        // Validate required environment variables
        if (!process.env.EMAIL_HOST || !process.env.EMAIL_USER || !process.env.EMAIL_PASS) {
            throw new Error('Email configuration is incomplete. Please check EMAIL_HOST, EMAIL_USER, and EMAIL_PASS environment variables.');
        }

        // Create transporter
        const transporter = nodemailer.createTransport({
            host: process.env.EMAIL_HOST,
            port: parseInt(process.env.EMAIL_PORT) || 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: process.env.EMAIL_USER,
                pass: process.env.EMAIL_PASS,
            },
            tls: {
                rejectUnauthorized: false // Allow self-signed certificates
            }
        });

        // Verify transporter configuration
        await transporter.verify();

        // Define email options
        const mailOptions = {
            from: `${process.env.EMAIL_FROM || 'CompliFlow'} <${process.env.EMAIL_USER}>`,
            to: options.email,
            subject: options.subject,
            text: options.message,
            html: options.html,
        };

        // Send email
        const info = await transporter.sendMail(mailOptions);
        console.log('Email sent successfully:', info.messageId);
        return info;
    } catch (error) {
        console.error('Email sending failed:', error.message);
        throw new Error(`Failed to send email: ${error.message}`);
    }
};

module.exports = sendEmail;