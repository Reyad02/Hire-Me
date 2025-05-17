import { model, Schema } from "mongoose";
import { IInvoice } from "./invoice.inerface";

const invoiceSchema = new Schema<IInvoice>(
  {
    transactionId: { type: String, required: true },
    amount: { type: Number, required: true },
    user: {
      type: Schema.Types.ObjectId,
      ref: "user",
      required: true,
    },
  },
  { timestamps: true }
);

const invoice = model<IInvoice>("invoice", invoiceSchema);
export default invoice;
