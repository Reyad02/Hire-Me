import z from "zod";

export const updateJobApplicationValidation = z.object({
  status: z.enum(["pending", "accepted", "rejected"]).optional(),
});
