import dotenv from "dotenv";
import path from "path";
dotenv.config({ path: path.join(process.cwd(), ".env") });
export default {
  jwt_secret: process.env.JWT_SECRET,
  refresh_secret: process.env.JWT_REFRESH_SECRET,
  expires_in: process.env.JWT_EXPIRES_IN,
  refresh_expires_in: process.env.REFRESH_EXPIRES_IN,
};
