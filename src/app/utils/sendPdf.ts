import multer from "multer";
import fs from "fs";
import config from "../config";

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

export const upload = multer({ storage: storage });
