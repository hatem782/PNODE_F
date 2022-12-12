const cloudinary = require("cloudinary").v2;
let streamifier = require("streamifier");

const FileUploadUrlEncoded = async (image64UrlEncoded) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
  try {
    const response = await cloudinary.uploader.upload(image64UrlEncoded, {
      upload_preset: process.env.CLOUDINARY_IMG_PRESET,
    });
    return {
      sucess: true,
      url: response?.url,
    };
  } catch (error) {
    return {
      sucess: false,
      url: "",
    };
  }
};

const FileUpload = async (file, folder) => {
  cloudinary.config({
    cloud_name: process.env.CLOUDINARY_NAME,
    api_key: process.env.CLOUDINARY_KEY,
    api_secret: process.env.CLOUDINARY_SECRET_KEY,
  });
  return new Promise((resolve, reject) => {
    let cld_upload_stream = cloudinary.uploader.upload_stream(
      { folder: `/isamm/${folder}` },
      (error, result) => {
        if (result) {
          resolve(result);
        } else {
          reject(error);
        }
      }
    );
    streamifier.createReadStream(file.data).pipe(cld_upload_stream);
  });
};

module.exports = {
  FileUploadUrlEncoded,
  FileUpload,
};
