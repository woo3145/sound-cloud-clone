import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiTags } from '@nestjs/swagger';
import { UploadsService } from './uploads.service';

@ApiTags('Uploads')
@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('audio')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAudio(@UploadedFile() file: Express.Multer.File) {
    try {
      console.log(file);
      return this.uploadsService.uploadAudio(file);
    } catch (e) {
      console.log('Upload Audio Error\n', e);
      throw e;
    }
  }
  @Post('avatar')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAvatar(@UploadedFile() file: Express.Multer.File) {
    try {
      return this.uploadsService.uploadAvatar(file);
    } catch (e) {
      console.log('Upload Audio Error\n', e);
      throw e;
    }
  }
}
