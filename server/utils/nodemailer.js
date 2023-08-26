const nodemailer = require("nodemailer");


const emailService = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: 'shadowbytee@gmail.com',
      pass: 'ewssududuzduumrw'
    }
  });


module.exports = emailService;
