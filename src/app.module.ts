import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ImageUploadModule } from './image-upload/image_upload.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [ImageUploadModule,
    MulterModule.register({
    dest: './files',
  }),
  ServeStaticModule.forRoot({
    rootPath: join(__dirname, '..', 'client'),
    exclude: ['/api*'],
  })
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
