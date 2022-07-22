import jwt from "jsonwebtoken";
import dotenv from "dotenv";
import { OAuth2Client } from "google-auth-library";

dotenv.config();
const secret = "test";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token.length);
    const CLIENT_ID = process.env.GOOGLE_CLIENT_ID;
    const client = new OAuth2Client(CLIENT_ID);

    if (token.length < 500) {
      const decode = jwt.verify(token, secret);

      req.userId = decode.id;
    } else {
      const ticket = await client.verifyIdToken({
        idToken: token,
        audience: CLIENT_ID,
      });
      const payload = ticket.getPayload();
      req.userId = payload["sub"];
    }

    next();
  } catch (error) {
    console.log(error.message);
  }
};

export default auth;
