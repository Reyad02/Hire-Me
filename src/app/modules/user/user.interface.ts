export interface IUser {
  name: string;
  email: string;
  password: string;
  role: "job_seeker" | "admin" | "user";
}
