import { IUser } from "./user.interface";
import user from "./user.model";

const registrationUser = async (userInfo: IUser) => {
  const isUserExist = await user.findOne({ email: userInfo?.email });
  if (isUserExist) {
    throw Error("User already exist");
  }

  const result = await user.create(userInfo);
  return result;
};

const updateUser = async (userEmail: string, userInfo: Partial<IUser>) => {
  const isUserExist = await user.findOne({ email: userEmail });
  if (!isUserExist) {
    throw Error("User doesn't already exist");
  }

  const updatedUser = await user.findOneAndUpdate(
    { email: userEmail },
    userInfo,
    {
      new: true,
    }
  );

  return updatedUser;
};

const deleteUser = async (userEmail: string) => {
  const isUserExist = await user.findOne({ email: userEmail });
  if (!isUserExist) {
    throw Error("User doesn't already exist");
  }

  const updatedUser = await user.findOneAndDelete(
    { email: userEmail },
    {
      new: true,
    }
  );

  return updatedUser;
};

const getUser = async (userEmail: string) => {
  const isUserExist = await user.findOne({ email: userEmail });
  if (!isUserExist) {
    throw Error("User doesn't exist");
  }

  return isUserExist;
};

const getAllUsers = async () => {
  const isUserExist = await user.find();
  if (isUserExist.length < 1) {
    throw Error("User doesn't  exist");
  }

  return isUserExist;
};

export const userServices = {
  registrationUser,
  updateUser,
  deleteUser,
  getUser,
  getAllUsers
};
