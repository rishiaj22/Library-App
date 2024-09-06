const nodemailer = require("nodemailer");
const dotenv = require("dotenv")
dotenv.config();

const transporter = nodemailer.createTransport({
  service: "gmail", 
  secure:true,
  port:465,
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS, 
  },
});

const sendEmailNotification = (bookDetails) => { 
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.NOTIFICATION_EMAIL, 
    subject: "New Book Created",
    text: `A new book has been created:\n\nCreated By: ${bookDetails.userName}\nUser Id: ${bookDetails.createdBy}\n\nTitle: ${bookDetails.title}\nAuthor: ${bookDetails.author}\nGenre: ${bookDetails.genre}\nDescription: ${bookDetails.description}\nPublished Year: ${bookDetails.publishedYear}\nLanguage: ${bookDetails.language}`,
  };

  return transporter.sendMail(mailOptions);
};

module.exports = { sendEmailNotification };