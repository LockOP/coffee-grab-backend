require("dotenv").config();
const client = require("twilio")(
  process.env.TWILIO_ACCOUNT_SID,
  process.env.TWILIO_AUTH_TOKEN
);

module.exports = client.verify.v2.services(
  process.env.TWILIO_VERIFY_SERVICE_ID
);
