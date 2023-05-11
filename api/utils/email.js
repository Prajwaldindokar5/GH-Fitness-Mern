/* eslint-disable import/no-extraneous-dependencies */
const nodemailer = require('nodemailer');

const sendEMail = async (options) => {
  // 1 create a transporter

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    port: 25,
    auth: {
      user: 'dindokarprajwal1@gmail.com',
      pass: 'pwuyqxkaqbywnxir',
    },
  });

  // 2 define the email options

  const mailOptions = {
    from: 'Prajwal Dindokar <dindokarprajwal1@gmail.com>',
    to: options.email,
    subject: options.subject,
    text: options.message,
  };

  //   3 send email
  await transporter.sendMail(mailOptions);
};

module.exports = sendEMail;
