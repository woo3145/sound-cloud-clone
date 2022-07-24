import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as AWS from 'aws-sdk';

@Injectable()
export class UploadsService {
  constructor(private readonly configService: ConfigService) {}

  async uploadFile(file: Express.Multer.File, folder: string): Promise<string> {
    AWS.config.update({
      region: this.configService.get('AWS_BUCKET_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    const fileName = `${folder}/${Date.now()}-${file.originalname}`;
    await new AWS.S3()
      .putObject({
        Key: fileName,
        Body: file.buffer,
        Bucket: this.configService.get('AWS_BUCKET_NAME'),
        ACL: 'public-read',
      })
      .promise();
    return `https://${this.configService.get(
      'AWS_BUCKET_NAME',
    )}.s3.${this.configService.get(
      'AWS_BUCKET_REGION',
    )}.amazonaws.com/${fileName}`;
  }

  async uploadAudio(file: Express.Multer.File) {
    const url = await this.uploadFile(file, 'audio');
    return {
      ok: true,
      url,
    };
  }

  async uploadAvatar(file: Express.Multer.File) {
    const url = await this.uploadFile(file, 'avatar');
    return {
      ok: true,
      url,
    };
  }

  async uploadArtwork(file: Express.Multer.File) {
    const url = await this.uploadFile(file, 'artwork');
    return {
      ok: true,
      url,
    };
  }
}
