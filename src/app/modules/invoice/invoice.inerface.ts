import { Types } from "mongoose";

export interface IInvoice {
  transactionId: string;
  user: Types.ObjectId; //(Job Seeker)
  job: Types.ObjectId;  
  amount: number;
}
