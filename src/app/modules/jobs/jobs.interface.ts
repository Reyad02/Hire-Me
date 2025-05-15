import { Types } from "mongoose";

  export interface IJobs {
  title: string;
  description: string;
  salary: number;
  postedBy: Types.ObjectId
}
  