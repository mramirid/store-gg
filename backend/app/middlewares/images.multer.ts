import crypto from "crypto";
import type express from "express";
import multer from "multer";
import path from "path";

export default { handleUpload };

// Storage engine for single image upload
const uploadStorage = multer.diskStorage({
  filename: (_, file, cb) => {
    cb(null, crypto.randomUUID() + path.extname(file.originalname));
  },
});

function handleUpload(fieldName: string): express.RequestHandler {
  return multer({
    storage: uploadStorage,
    limits: { fileSize: 1_000_000 }, // 1.000.000 Bytes = 1 MB
    fileFilter: (_, file, cb) => {
      checkFileType(file, cb);
    },
  }).single(fieldName);
}

function checkFileType(
  file: Express.Multer.File,
  cb: multer.FileFilterCallback
) {
  // Allowed ext
  const fileTypes = /jpeg|jpg|png|gif/;
  // Check ext
  const isExtValid = fileTypes.test(
    path.extname(file.originalname).toLowerCase()
  );
  // Check mime
  const isMimeTypeValid = fileTypes.test(file.mimetype);

  if (isMimeTypeValid && isExtValid) {
    cb(null, true);
    return;
  }
  cb(new TypeError("Images only: jpeg, jpg, png, or gif"));
}
