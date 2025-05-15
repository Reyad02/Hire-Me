import z from "zod";
import { ObjectId } from "mongodb";

export const jobsValidation = z.object({
  title: z.string({ required_error: "Title required" }),
  description: z.string({ required_error: "Description required" }),
  salary: z.number({ required_error: "Salary required" }),
  postedBy: z.string({required_error: "Posted By required"})
});
