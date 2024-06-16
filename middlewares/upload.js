/*
 * Middleware to uplad images via multer
 */
import multer from "multer";

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, `./public/${req.body.category}`);
  },
  filename: (req, file, cb) => {
    cb(null, file.fieldname + "-" + Date.now() + ".jpg");
  },
});

export const upload = multer({ storage: storage });
