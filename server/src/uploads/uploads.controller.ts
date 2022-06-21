import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/auth.decorator';
import * as AWS from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly configService: ConfigService) {}
  @Public()
  @Post('audio')
  @UseInterceptors(FileInterceptor('file'))
  async uploadFile(@UploadedFile() file: Express.Multer.File) {
    AWS.config.update({
      region: this.configService.get('AWS_BUCKET_REGION'),
      credentials: {
        accessKeyId: this.configService.get('AWS_ACCESS_KEY'),
        secretAccessKey: this.configService.get('AWS_SECRET_ACCESS_KEY'),
      },
    });

    try {
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
    } catch (error) {
      console.log(error);
    }
    console.log();
  }
}
