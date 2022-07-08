import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadsService {
  constructor(private readonly configService: ConfigService) {}

  async uploadAudio(file: Express.Multer.File) {
    AWS.config.update({
      region: this.configService.get('AWS_BUCKET_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    const fileName = 'audio/' + Date.now() + file.originalname;
    await new AWS.S3()
      .putObject({
        Key: fileName,
        Body: file.buffer,
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        ACL: 'public-read',
      })
      .promise();
    return {
      ok: true,
      url: `https://${this.configService.get(
        'AWS_BUCKET_NAME',
      )}.s3.${this.configService.get(
        'AWS_BUCKET_REGION',
      )}.amazonaws.com/${fileName}`,
    };
  }

  async uploadAvatar(file: Express.Multer.File) {
    AWS.config.update({
      region: this.configService.get('AWS_BUCKET_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    const fileName = 'avatar/' + Date.now() + file.originalname;
    await new AWS.S3()
      .putObject({
        Key: fileName,
        Body: file.buffer,
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        ACL: 'public-read',
      })
      .promise();
    return {
      ok: true,
      url: `https://${this.configService.get(
        'AWS_BUCKET_NAME',
      )}.s3.${this.configService.get(
        'AWS_BUCKET_REGION',
      )}.amazonaws.com/${fileName}`,
    };
  }
}
