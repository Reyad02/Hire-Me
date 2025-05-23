import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
  mongooose_uri: process.env.MONGOOSE_URL,
  port: process.env.PORT,
  saltRounds: process.env.SALT_ROUNDS,
  secret: process.env.SECRET,
  token_expired_time: process.env.TOKEN_EXPIRED_TIME,
  cloudinary_name: process.env.CLOUDINARY_NAME,
  cloudinary_api: process.env.CLOUDINARY_API,
  cloudinary_secret: process.env.CLOUDINARY_SECRET,
};
