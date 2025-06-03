const httpStatusText = require("../utils/httpStatusText");
const asyncWrapper = require("../middlewares/asyncWrapper");
const appError = require("../utils/appError");
const twilio = require("twilio");

// Put these in your .env file and use process.env
const accountSid = process.env.TWILIO_ACCOUNT_SID;
const authToken = process.env.TWILIO_AUTH_TOKEN;
const client = twilio(accountSid, authToken);

const sendMessage = asyncWrapper(async (req, res, next) => {
  const { to, body } = req.body;

  if (!to || !body) {
    return next(
      appError.create(
        "Both 'to' and 'body' fields are required",
        400,
        httpStatusText.FAIL
      )
    );
  }

  try {
    const message = await client.messages.create({
      body,
      from: process.env.TWILIO_PHONE_NUMBER, // Use verified Twilio number
      to, // Must be verified if you're on trial
    });
    console.log("Message :", message);
    res.status(200).json({
      status: httpStatusText.SUCESS,
      message: "Message sent successfully",
      sid: message.sid,
    });
  } catch (err) {
    return next(
      appError.create(
        "Failed to send message: " + err.message,
        500,
        httpStatusText.ERROR
      )
    );
  }
});

module.exports = { sendMessage };
