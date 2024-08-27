import {
  Controller,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
} from '@nestjs/common';
import { OllamaService } from './ollama.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('ollama')
export class OllamaController {
  constructor(private readonly ollamaService: OllamaService) {}

  @Post('generate-cover-letter')
  @UseInterceptors(FileInterceptor('resumeFile'))
  async generateCoverLetter(
    @Body('jobDescription') jobDescription: string,
    @UploadedFile() resumeFile: Express.Multer.File,
  ) {
    return this.ollamaService.createOllamaStream(jobDescription, resumeFile);
  }
}
