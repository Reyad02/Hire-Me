import { model, Schema } from "mongoose";
import bcrypt from "bcrypt";
import { IUser } from "./user.interface";
import config from "../../config";

const userSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    role: {
      type: String,
      enum: ["job_seeker", "admin", "user"],
      default: "job_seeker",
    },
  },
  { timestamps: true }
);

userSchema.pre("save", async function (next) {
  this.password = await bcrypt.hash(this.password, Number(config.saltRounds));
  next();
});
const user = model("user", userSchema);
export default user;
