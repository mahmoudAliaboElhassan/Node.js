// const twilio = require("twilio");

// const accountSid = process.env.TWILIO_ACCOUNT_SID;
// const authToken = process.env.TWILIO_AUTH_TOKEN;
// const client = twilio(accountSid, authToken);

// const sendMessage = async (req, res) => {
//   const { to, body } = req.body;

//   if (!to || !body) {
//     return res.status(400).json({
//       success: false,
//       message: "Both 'to' and 'body' fields are required",
//     });
//   }

//   try {
//     const message = await client.messages.create({
//       body,
//       from: process.env.TWILIO_PHONE_NUMBER,
//       to,
//     });

//     console.log("Message:", message);

//     res.status(200).json({
//       success: true,
//       message: "Message sent successfully",
//       sid: message.sid,
//     });
//   } catch (err) {
//     console.error("Error sending message:", err);
//     res.status(500).json({
//       success: false,
//       message: "Failed to send message: " + err.message,
//     });
//   }
// };

// module.exports = { sendMessage };
const twilio = require("twilio");

const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const verifyServiceSid = process.env.TWILIO_VERIFY_SERVICE_SID;

const client = twilio(accountSid, authToken);

const sendVerificationCode = async (req, res) => {
  const { to } = req.body;

  if (!to) {
    return res.status(400).json({
      success: false,
      message: "'to' field (phone number) is required",
    });
  }

  try {
    const verification = await client.verify.v2
      .services(verifyServiceSid)
      .verifications.create({
        to,
        channel: "sms",
      });
    console.log("Verification:", verification);
    res.status(200).json({
      success: true,
      message: "Verification code sent successfully",
      sid: verification.sid,
      status: verification.status,
    });
  } catch (err) {
    console.error("Error sending verification code:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to send verification code: " + err.message,
    });
  }
};

// Verify the Code Entered by the User
const verifyCode = async (req, res) => {
  const { to, code } = req.body;

  if (!to || !code) {
    return res.status(400).json({
      success: false,
      message: "'to' (phone number) and 'code' are required",
    });
  }

  try {
    const verificationCheck = await client.verify.v2
      .services(verifyServiceSid)
      .verificationChecks.create({
        to,
        code,
      });

    console.log("Verification Check:", verificationCheck);

    if (verificationCheck.status === "approved") {
      return res.status(200).json({
        success: true,
        message: "Verification code is correct",
        verificationSid: verificationCheck.sid,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Verification code is incorrect",
        verificationSid: verificationCheck.sid,
      });
    }
  } catch (err) {
    console.error("Error verifying code:", err.message);
    res.status(500).json({
      success: false,
      message: "Failed to verify code: " + err.message,
    });
  }
};

module.exports = { sendVerificationCode, verifyCode };
