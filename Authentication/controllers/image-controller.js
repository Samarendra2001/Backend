const Image = require("../models/Image");
const { uploadToCloudinary } = require("../helpers/cloudinaryHelper");
const fs = require("fs");
const cloudinary = require("../config/cloudinary");

const uploadImageController = async (req, res) => {
    try {
      //check if file is missing in req object
      if (!req.file) {
        return res.status(400).json({
          success: false,
          message: "File is required. Please upload an image",
        });
      }
  
      //upload to cloudinary
      const { url, publicId } = await uploadToCloudinary(req.file.path);
  
      //store the image url and public id along with the uploaded user id in database
      const newlyUploadedImage = new Image({
        url,
        publicId,
        uploadedBy: req.userInfo.userId,
      });
  
      await newlyUploadedImage.save();
  
      //delete the file from local stroage. if you dont want to keep it in upload folder in our directory
      // fs.unlinkSync(req.file.path);
  
      res.status(201).json({
        success: true,
        message: "Imaged uploaded successfully",
        image: newlyUploadedImage,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong! Please try again",
      });
    }
  };
  const fetchImagesController = async (req, res) => {
    try {
      const page = parseInt(req.query.page) || 1;//in which page u r in by efault it is 1
      const limit = parseInt(req.query.limit) || 2;//how many images u want per page
      const skip = (page - 1) * limit;//skip logic if i am on 2nd page i have to skip last 2 images
  
      const sortBy = req.query.sortBy || "createdAt";//sort by created at time
      const sortOrder = req.query.sortOrder === "asc" ? 1 : -1;//sorting by ascending order
      const totalImages = await Image.countDocuments();//total no.of images
      const totalPages = Math.ceil(totalImages / limit);//total no.of pages logic
  
      const sortObj = {};
      sortObj[sortBy] = sortOrder;
      const images = await Image.find().sort(sortObj).skip(skip).limit(limit);
  
      if (images) {
        res.status(200).json({
          success: true,
          currentPage: page,
          totalPages: totalPages,
          totalImages: totalImages,
          data: images,
        });
      }
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong! Please try again",
      });
    }
  };
  const deleteImageController = async (req, res) => {
    try {
      const getCurrentIdOfImageToBeDeleted = req.params.id;
      const userId = req.userInfo.userId;
  
      const image = await Image.findById(getCurrentIdOfImageToBeDeleted);
  
      if (!image) {
        return res.status(404).json({
          success: false,
          message: "Image not found",
        });
      }
  
      //check if this image is uploaded by the current user who is trying to delete this image
      if (image.uploadedBy.toString() !== userId) {
        return res.status(403).json({
          success: false,
          message: `You are not authorized to delete this image because you haven't uploaded it`,
        });
      }
  
      //delete this image first from your cloudinary stroage
      await cloudinary.uploader.destroy(image.publicId);
  
      //delete this image from mongodb database
      await Image.findByIdAndUpdate(getCurrentIdOfImageToBeDeleted);
  
      res.status(200).json({
        success: true,
        message: "Image deleted successfully",
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({
        success: false,
        message: "Something went wrong! Please try again",
      });
    }
  };

  module.exports = 
    {uploadImageController,deleteImageController,fetchImagesController};