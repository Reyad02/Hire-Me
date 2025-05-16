import z from "zod";

export const jobsValidation = z.object({
  title: z.string({ required_error: "Title required" }),
  description: z.string({ required_error: "Description required" }),
  salary: z.number({ required_error: "Salary required" }),
});

export const jobUpdateValidation = z.object({
  title: z.string().optional(),
  description: z.string().optional(),
  salary: z.number().optional(),
});
