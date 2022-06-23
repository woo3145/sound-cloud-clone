import {
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Public } from 'src/auth/auth.decorator';
import { UploadsService } from './uploads.service';

@Controller('uploads')
export class UploadsController {
  constructor(private readonly uploadsService: UploadsService) {}

  @Post('audio')
  @UseInterceptors(FileInterceptor('file'))
  async uploadAudio(@UploadedFile() file: Express.Multer.File) {
    try {
      return this.uploadsService.uploadAudio(file);
    } catch (e) {
      console.log('Upload Audio Error\n', e);
      throw e;
    }
  }
}
