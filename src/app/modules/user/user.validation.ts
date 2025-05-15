import z from "zod";
export const userValidation = z.object({
  name: z.string({ required_error: "Name required" }),
  email: z.string({ required_error: "Email required" }).email(),
  password: z.string({ required_error: "Password required" }),
  role: z
    .enum(["job_seeker", "admin", "user"], { required_error: "Role required" })
    .default("job_seeker"),
});
