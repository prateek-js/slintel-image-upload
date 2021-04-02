import { Req, Res, Injectable } from '@nestjs/common';
import * as multer from 'multer';
import * as AWS from 'aws-sdk';
import * as multerS3 from 'multer-s3';

const AWS_S3_BUCKET_NAME = 'slinter-image';
const s3 = new AWS.S3();
AWS.config.update({
  accessKeyId: 'AKIAYTYKKCLW3HJE5QH4',
  secretAccessKey: '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',
});

@Injectable()
export class ImageUploadService {
  constructor() {}

  async fileupload(@Req() req, @Res() res) {
    try {
      this.upload(req, res, function(error) {
        if (error) {
          console.log(error);
          return res.status(404).json(`Failed to upload image file: ${error}`);
        }
        return res.status(201).json(req.files[0].location);
      });
    } catch (error) {
      console.log(error);
      return res.status(500).json(`Failed to upload image file: ${error}`);
    }
  }

  upload = multer({
    storage: multerS3({
      s3: s3,
      bucket: 'slinter-image',
      acl: 'public-read',
      key: function(request, file, cb) {
        cb(null, `${Date.now().toString()} - ${file.originalname}`);
      },
      resize: {
        width: 600,
        height: 400,
      },
    }),
  }).array('upload', 1);
}