const jwt = require('jsonwebtoken');
const secret = process.env.JWT_SECRET;
const createUser = require('../../controllers/users/createUser');
const nodemailer = require('nodemailer');

const postUsersHandler = async (req, res) => {
  const {
    userName,
    profilePicture,
    description,
    email,
    password,
    phoneNumber,
    location,
    fb,
    tw,
    ig,
    googleUser,
    verified,
  } = req.body;

  try {
    if (!userName || !email || !password) {
      throw Error('Missing data');
    }

    const newUser = await createUser(
      userName,
      profilePicture,
      description,
      email,
      password,
      phoneNumber,
      location,
      fb,
      tw,
      ig,
      googleUser,
      verified
    );
    console.log(newUser);
    const token = jwt.sign(
      { userId: newUser.userId, password: newUser.password },
      secret,
      { expiresIn: '3h' }
    );
    const verificationLink = `https://pf-arts-client.vercel.app/verify?token=${token}`;
    const mailOptions = {
      from: 'henryartgallery@hotmail.com',
      to: email,
      subject: 'Email Verification',
      html: `
        <h1>Welcome to Our Art Gallery!</h1>
        <p>Dear ${userName},</p>
        <p>Thank you for joining our Art Gallery community. To complete your registration, please click on the link below to verify your email address:</p>
        <a href="${verificationLink}">Verify Email</a>
        <p>This link will expire in 3 hours for security reasons.</p>
        <p>If you didn't create an account on our website, please ignore this email.</p>
        <p>Best regards,</p>
        <p>The Art Gallery Team</p>
      `,
    };

    if (!googleUser) {
      const transporter = nodemailer.createTransport({
        host: 'smtp.office365.com',
        port: 587,
        secure: false,
        auth: {
          user: 'henryartgallery@hotmail.com',
          pass: 'Pepeart123',
        },
        tls: {
          ciphers: 'SSLv3',
          rejectUnauthorized: false,
        },
      });

      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'Failed to send verification email' });
        } else {
          console.log('Verification email sent: ' + info.response);
          res.status(201).json(newUser);
        }
      });
    } else {
      res.status(201).json(newUser);
    }
  } catch (error) {
    res.status(422).json({ error: error.message });
  }
};

module.exports = postUsersHandler;
