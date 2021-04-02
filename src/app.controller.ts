import {
  Controller,
  Get,
  Post,
  UseInterceptors,
  UploadedFile,
  UploadedFiles,
  Res,
  Param,
  Query,
  Req,
  HttpStatus
} from '@nestjs/common';
import { FileInterceptor, FilesInterceptor } from '@nestjs/platform-express';
import { Request } from 'express';
import { diskStorage } from 'multer';
import { ApiBody, ApiConsumes, ApiQuery, ApiResponse, ApiSecurity, ApiTags } from '@nestjs/swagger';
import { editFileName, imageFileFilter } from './utils/file-upload.utils';
import { AppService } from './app.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService
    ) {}
  @ApiBody({
    schema: {
        type: 'object',
        properties: {
            file: {
                type: 'string',
                format: 'binary',
            },
        },
    },
  })
  @ApiQuery({
      name: 'resolution',
      type: String,
  })
  @Post()
  @ApiConsumes('multipart/form-data')
  @UseInterceptors(
    FileInterceptor('image', {
      
      storage: diskStorage({
        destination: './files',
        filename: editFileName
      }),
      fileFilter: imageFileFilter
    }),
  )
  @ApiResponse({ status: HttpStatus.CREATED, description: 'Returns File original name & saved name' })
  async uploadedFile(@Query('resolution') resolution: string, @UploadedFile() file) {
    const response = {
      originalname: file.originalname,
      filename: file.filename,
    };
    return {
      status: HttpStatus.OK,
      message: 'Image uploaded successfully!',
      data: response,
    };;
  }

  @Get('findImage/:image')
  @ApiResponse({ status: HttpStatus.OK, description: 'Return image'})
  @ApiResponse({ status: HttpStatus.NOT_FOUND, description: '404 with message if image not found' })
  seeUploadedFile(@Param('image') image: string, @Res() res) {
    return res.sendFile(image, { root: './files' });
  }

  @Get()
  root(): string {
    return this.appService.root();
  }
}
