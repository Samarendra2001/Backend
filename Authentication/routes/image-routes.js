const express = require("express");
const authMiddleware = require("../middleware/auth-middleware");
const adminMiddleware = require("../middleware/admin-middleware");
const uploadMiddleware = require("../middleware/upload-middleware");
const {
  uploadImageController,
  //fetchImagesController,
  deleteImageController,
  fetchImagesController,
} = require("../controllers/image-controller");

const router = express.Router();

//upload the image
router.post(
  "/upload",
  authMiddleware,
  adminMiddleware,
  uploadMiddleware.single("image"),//remember in postman also pass the key name as passed here (image).it should be same
  uploadImageController
);

//to get all the images
router.get("/get", authMiddleware, fetchImagesController);
//delete image route
router.delete("/:id", authMiddleware, adminMiddleware, deleteImageController);

module.exports = router;