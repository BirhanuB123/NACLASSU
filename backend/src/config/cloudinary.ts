import { v2 as cloudinary } from 'cloudinary';
import { Readable } from 'stream';

// Configure Cloudinary using environment variables
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
  secure: true,
});

export interface CloudinaryUploadResult {
  url: string;
  publicId: string;
  format?: string;
  resourceType: string;
  bytes?: number;
}

/**
 * Upload a memory buffer (e.g. from Multer) directly to Cloudinary via upload_stream.
 *
 * @param buffer - File buffer from multer memory storage
 * @param originalName - Original filename for reference/sanitizing
 * @param folder - Cloudinary folder (e.g. 'nassu/gallery', 'nassu/documents')
 * @param resourceType - 'image' | 'raw' | 'video' | 'auto'
 */
export const uploadBufferToCloudinary = (
  buffer: Buffer,
  originalName: string,
  folder: string,
  resourceType: 'image' | 'raw' | 'video' | 'auto' = 'auto'
): Promise<CloudinaryUploadResult> => {
  return new Promise((resolve, reject) => {
    if (!process.env.CLOUDINARY_CLOUD_NAME || !process.env.CLOUDINARY_API_KEY || !process.env.CLOUDINARY_API_SECRET) {
      return reject(
        new Error(
          'Cloudinary is not configured. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, and CLOUDINARY_API_SECRET in your backend .env file.'
        )
      );
    }

    // Sanitize filename to use as a clean public_id prefix/suffix
    const sanitizedBaseName = originalName
      .replace(/\.[^/.]+$/, '')
      .replace(/[^a-zA-Z0-9.\-_]/g, '_');

    const uploadStream = cloudinary.uploader.upload_stream(
      {
        folder,
        public_id: `${Date.now()}_${sanitizedBaseName}`,
        resource_type: resourceType,
        use_filename: true,
        unique_filename: true,
        overwrite: false,
      },
      (error, result) => {
        if (error || !result) {
          return reject(error || new Error('Cloudinary upload failed with empty result.'));
        }
        resolve({
          url: result.secure_url || result.url,
          publicId: result.public_id,
          format: result.format,
          resourceType: result.resource_type,
          bytes: result.bytes,
        });
      }
    );

    const stream = new Readable();
    stream.push(buffer);
    stream.push(null);
    stream.pipe(uploadStream);
  });
};

/**
 * Delete an asset from Cloudinary using its public_id.
 *
 * @param publicId - The public ID returned when uploaded
 * @param resourceType - 'image' | 'raw' | 'video'
 */
export const deleteFromCloudinary = async (
  publicId: string,
  resourceType: 'image' | 'raw' | 'video' = 'image'
): Promise<any> => {
  if (!publicId) return;
  try {
    const result = await cloudinary.uploader.destroy(publicId, {
      resource_type: resourceType,
    });
    return result;
  } catch (error) {
    console.warn(
      `⚠️ Could not delete Cloudinary asset "${publicId}":`,
      error instanceof Error ? error.message : error
    );
  }
};

export default cloudinary;
