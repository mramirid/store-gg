import crypto from "crypto";
import type express from "express";
import multer from "multer";
import path from "path";
import { FormValidationError } from "../../lib/error";

export default { setupSingleUpload };

// Storage engine for single image upload
const singleUploadStorage = multer.diskStorage({
  filename: (_, file, cb) => {
    cb(null, crypto.randomUUID() + path.extname(file.originalname));
  },
});

function setupSingleUpload(fieldName: string): express.RequestHandler {
  return multer({
    storage: singleUploadStorage,
    limits: { fileSize: 1_000_000 }, // 1.000.000 Bytes = 1 MB
    fileFilter: (_, file, cb) => {
      const isValid = isValidFileType(file);
      if (isValid) {
        cb(null, true);
        return;
      }

      const validationError = new FormValidationError();
      validationError.addFieldError(
        fieldName,
        "Images only: jpeg, jpg, png, or gif"
      );
      cb(validationError);
    },
  }).single(fieldName);
}

function isValidFileType(file: Express.Multer.File) {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  // Check ext
  const isExtValid = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  // Check mime
  const isMimeTypeValid = fileTypes.test(file.mimetype);

  return isMimeTypeValid && isExtValid;
}
