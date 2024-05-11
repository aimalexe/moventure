import nodemailer from 'nodemailer';
import config from 'config';

export const transporter = nodemailer.createTransport({
    service: 'Gmail',
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        user: config.get('MAILER.email'),
        pass: config.get('MAILER.password'),
    },
});