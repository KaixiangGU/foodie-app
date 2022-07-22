import jwt from "jsonwebtoken";
import { OAuth2Client } from "google-auth-library";

const secret = "test";

const auth = async (req, res, next) => {
  try {
    const token = req.headers.authorization.split(" ")[1];
    console.log(token.length);
    const CLIENT_ID = "1048352977453-i02u1k8gqqkg44mlbrq4dnghounhm42p.apps.googleusercontent.com";
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
