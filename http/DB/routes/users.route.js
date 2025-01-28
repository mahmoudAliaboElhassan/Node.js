const express = require("express");
const router = express.Router();

const usersController = require("../controllers/users.controller");
const { validationSchemaLogin } = require("../middlewares/validationSchema");
const verifyToken = require("../middlewares/verifyToken");
const multer = require("multer");
const appError = require("../utils/appError");
const httpStatus = require("../utils/httpStatusText");

const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    // cb => callback
    console.log("FILe", file);
    cb(null, "DB/uploads");
  },
  filename: function (req, file, cb) {
    const ext = file.mimetype.split("/")[1];
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, file.fieldname + "-" + uniqueSuffix + "." + ext);
  },
});

const fileFilterFn = (req, file, cb) => {
  const imageType = file.mimetype.split("/")[0];
  if (imageType === "image") {
    return cb(null, true);
  } else {
    return cb(
      appError.create(
        "file type is not supported expected image",
        400,
        httpStatus.FAIL
      ),
      false
    );
  }
};

const upload = multer({
  storage: diskStorage,
  fileFilter: fileFilterFn,
});

router.route("/").get(verifyToken, usersController.getAllUsers);
router.route("/register").post(upload.single("avatar"), usersController.signUp);
router.route("/login").post(validationSchemaLogin(), usersController.login);
router.route("/logout").get(usersController.logOut);
router
  .route("/change-password/:id")
  .put(verifyToken, usersController.change_password);

module.exports = router;
