import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import { Body, ManagedUpload } from 'aws-sdk/clients/s3';
import { Readable } from 'stream';


@Injectable()
export class S3Service {

    async uploadFile(file: Express.Multer.File, bucketName: string, bucketRegion: string, fileNameWithPath: string): Promise<string> {

        const s3  = new AWS.S3({
            region: bucketRegion,
        });

        const params = {
            Bucket: bucketName,
            Body: file.buffer,
            Key: fileNameWithPath
        };
        const uploadResponse: ManagedUpload.SendData = await s3.upload(params).promise();
    
        return uploadResponse.Key;
    }
}