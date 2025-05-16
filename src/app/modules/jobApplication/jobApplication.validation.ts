import z from "zod";

export const jobApplicationValidation = z.object({
  job: z.string({ required_error: "Job required" }),
  applicant: z.string({ required_error: "Applicant required" }),
  resume: z.string().optional(),
  paymentStatus: z.enum(["pending", "paid"]).default("pending"),
  status: z.enum(["pending", "accepted", "rejected"]).default("pending"),
  transactionId: z.string().optional(),
  amount: z.number({ required_error: "Amount required" }),
});

export const updateJobApplicationValidation = z.object({
  resume: z.string().optional(),
  paymentStatus: z.enum(["pending", "paid"]).optional(),
  status: z.enum(["pending", "accepted", "rejected"]).optional(),
  transactionId: z.string().optional(),
});
