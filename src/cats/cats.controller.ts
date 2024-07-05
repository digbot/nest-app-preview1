import {
  Controller,
  Get,
  Param,
  Post,
  Req,
  Body,
  UseInterceptors,
  UploadedFile,
  Res,
  HttpStatus,
  ParseFilePipeBuilder,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { CatsService } from './cats.service';
import { LoggerService } from '../dmodule/logger.service';
import { Request, Response } from 'express';
import { CustomUploadFileTypeValidator } from '../app.validators';

const MAX_PROFILE_PICTURE_SIZE_IN_BYTES = 2 * 1024 * 1024;
//const VALID_UPLOADS_MIME_TYPES = ['image/jpeg', 'image/png'];
const VALID_UPLOADS_MIME_TYPES = [];


@Controller('cats')
export class CatsController {
  constructor(
    private readonly catsService: CatsService,
    private readonly loggerService: LoggerService,
  ) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  uploadFile(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addValidator(
          new CustomUploadFileTypeValidator({
            fileType: VALID_UPLOADS_MIME_TYPES,
          }),
        )
        .addMaxSizeValidator({ maxSize: MAX_PROFILE_PICTURE_SIZE_IN_BYTES })
        .build({ errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY }),
    )
    file: Express.Multer.File,
    @Body() body,
    @Res() res: Response,
  ) {
    const buffer = Buffer.from(file.buffer);

    // Set the content type to 'image/png'
    res.setHeader('Content-Type', 'image/png');

    // Send the buffer as the response
    res.send(buffer);
  }

  @Get('file')
  getFile(@Req() request: Request): string[] {
    request.session.visits = request.session.visits
      ? request.session.visits + 1
      : 1;
    const logItem = this.loggerService.writeCount(request.session.visits);
    return this.catsService.getCats(logItem);
  }

  /*
  @Post('upload')
  uploadSingleFileWithPost(@UploadedFile() file, @Body() body) {
    console.log(file);
    console.log(body);
    console.log(body.favoriteColor);
    return body;
  }*/

  @Get()
  getCats(@Req() request: Request): string[] {
    request.session.visits = request.session.visits
      ? request.session.visits + 1
      : 1;
    const logItem = this.loggerService.writeCount(request.session.visits);
    return this.catsService.getCats(logItem);
  }

  @Get(':name')
  getCatByName(@Param('name') name: string): string {
    if (name.toLowerCase() === 'garfield') {
      return 'You found Garfield! Congratulations! 🎉';
    }
    return `Meow! Here's ${name}, your cute cat.`;
  }s
}
