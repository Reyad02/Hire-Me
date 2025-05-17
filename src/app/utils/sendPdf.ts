import multer, { FileFilterCallback } from "multer";
import fs from "fs";
import config from "../config";
import path from "path";
import { Request } from "express";

// eslint-disable-next-line @typescript-eslint/no-require-imports
const cloudinary = require("cloudinary").v2;

export const sendPdf = async (pdfName: string, path: string) => {
  cloudinary.config({
    cloud_name: config.cloudinary_name,
    api_key: config.cloudinary_api,
    api_secret: config.cloudinary_secret,
  });

  try {
    const result = await cloudinary.uploader.upload(path, {
      public_id: pdfName,
      resource_type: "raw",
    });

    // delete saved file in uploads folder
    fs.unlink(path, (err) => {
      if (err) {
        console.log("An error occurred:", err);
      }
    });

    return result;
  } catch (err: any) {
    console.log(err);
    throw Error("Cloudinary failed");
  }
};

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, process.cwd() + "/uploads/");
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix);
  },
});

const fileFilter = (req: Request, file: any, cb: FileFilterCallback) => {
  const fileExt = path.extname(file.originalname).toLowerCase();
  if (fileExt === ".pdf") {
    cb(null, true);
  } else {
    cb(new Error("Only PDF files are allowed!"));
  }
};

export const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
  fileFilter,
});
