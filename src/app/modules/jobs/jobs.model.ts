import { model, Schema } from "mongoose";
import { IJobs } from "./jobs.interface";

const jobSchema = new Schema<IJobs>(
  {
    title: { type: String, required: true },
    description: { type: String, required: true },
    salary: { type: Number, required: true },
    postedBy: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    company: { type: String, required: true },
  },
  { timestamps: true }
);

const jobs = model<IJobs>("job", jobSchema);
export default jobs;
