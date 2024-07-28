const crypto = require("crypto");
const sendEmail = require("./SendEmail");

async function generateOTP(email) {
  const otp = crypto.randomBytes(3).toString("hex"); // Generates a 6-character hexadecimal OTP
  const message = `Hello, 
Dear user, A login attempt is made to SharkTank-Lite Website using this Email - ${email}
Please use the following OTP for the verification - ${otp}
This OTP is valid for the next 5 minutes. If you did not request this, please ignore this email.

Thank you,
The SharkTank-Lite Team.
`;
  try {
    await sendEmail(email, message);
    return otp;
  } catch (error) {
    return error;
  }
}

module.exports = { generateOTP };
