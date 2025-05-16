import { model, Schema } from "mongoose";
import { IJobApplication } from "./jobApplication.interface";

const jobApplicationSchema = new Schema<IJobApplication>(
  {
    job: {
      type: Schema.Types.ObjectId,
      ref: "job",
      required: true,
    },
    applicant: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
    resume: {
      type: String,
      required: true,
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "paid"],
      default: "pending",
    },
    status: {
      type: String,
      enum: ["pending", "accepted", "rejected"],
      default: "pending",
    },
    transactionId: {
      type: String,
    },
    amount: {
      type: Number,
      default: 100,
    },
  },
  { timestamps: true }
);

const jobApplication = model<IJobApplication>(
  "jobApplication",
  jobApplicationSchema
);
export default jobApplication;
