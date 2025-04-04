import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';

dotenv.config();

// Configure Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET
});

/**
 * Upload a base64 image to Cloudinary
 * @param {string} base64Image - Base64 encoded image string
 * @returns {Promise<string>} - URL of the uploaded image
 */
export const uploadImageToCloudinary = async (base64Image) => {
  try {
    // Remove the data:image/jpeg;base64, prefix if present
    const base64Data = base64Image.replace(/^data:image\/\w+;base64,/, '');
    
    // Upload to Cloudinary
    const result = await new Promise((resolve, reject) => {
      cloudinary.uploader.upload_stream(
        {
          folder: 'pet-mitra',
          resource_type: 'auto'
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      ).end(Buffer.from(base64Data, 'base64'));
    });
    
    return result.secure_url;
  } catch (error) {
    console.error('Error uploading image to Cloudinary:', error);
    throw error;
  }
};

/**
 * Upload multiple base64 images to Cloudinary
 * @param {string[]} base64Images - Array of base64 encoded image strings
 * @returns {Promise<string[]>} - Array of URLs of the uploaded images
 */
export const uploadMultipleImagesToCloudinary = async (base64Images) => {
  try {
    const uploadPromises = base64Images.map(image => uploadImageToCloudinary(image));
    return await Promise.all(uploadPromises);
  } catch (error) {
    console.error('Error uploading multiple images to Cloudinary:', error);
    throw error;
  }
}; 