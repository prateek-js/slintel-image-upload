import {
    Controller,
    Post,
    Req,
    UsePipes,
    Res,
    UseGuards,
    Query,
  } from '@nestjs/common';
  import { ImageUploadService } from './image_upload.service';
  
  @Controller('fileupload')
  export class ImageUploadController {
    constructor(private readonly imageUploadService: ImageUploadService) {}
    @Post()
    async create(@Req() request, @Query('resolution') resolution: string, @Res() response) {
      try {
        await this.imageUploadService.fileupload(request, response);
      } catch (error) {
        return response
          .status(500)
          .json(`Failed to upload image file: ${error.message}`);
      }
    }
  }