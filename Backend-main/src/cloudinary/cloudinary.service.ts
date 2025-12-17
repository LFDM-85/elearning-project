import { Injectable } from '@nestjs/common';
import { UploadApiErrorResponse, UploadApiResponse, v2 } from 'cloudinary';
import toStream from 'buffer-to-stream';
import streamifier from 'streamifier';

@Injectable()
export class CloudinaryService {
  async uploadfile(file: Express.Multer.File) {
    return (resolve, reject) => {
      const upload = v2.uploader.upload_stream(
        {
          upload_preset: 'ml_default',
        },
        (error, result) => {
          if (error) return reject(error);
          resolve({
            url: result.url,
            id: result.public_id,
            resource_type: 'auto',
          });
        },
      );
      toStream(file.buffer).pipe(upload);
      // streamifier.createReadStream(file.buffer).pipe(upload);
    };
  }
}
