import { Types } from "mongoose";

export interface IJobApplication {
  job: Types.ObjectId;
  applicant: Types.ObjectId;
  paymentStatus: "pending" | "paid";
  status: "pending" | "accepted" | "rejected";
  resume?: string;
  transactionId?: string ;
  amount: number;
}
