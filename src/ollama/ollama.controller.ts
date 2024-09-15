import {
  Controller,
  Body,
  Post,
  UseInterceptors,
  UploadedFile,
  Sse,
} from '@nestjs/common';
import { OllamaService } from './ollama.service';
import { FileInterceptor } from '@nestjs/platform-express';

@Controller('ollama')
export class OllamaController {
  constructor(private readonly ollamaService: OllamaService) { }

  @Post('generate-cover-letter')
  // @Sse()
  @UseInterceptors(FileInterceptor('resumeFile'))
  async generateCoverLetter(
    @Body('jobDescription') jobDescription: string,
    @UploadedFile() resumeFile: Express.Multer.File,
  ) {
    console.info(
      `\x1b[1;41m🚀 BRICHARD-LOGGER\x1b[0m ~  | OllamaController | jobDescription:`,
      jobDescription,
    );
    return this.ollamaService.createOllamaStream(jobDescription, resumeFile);
  }
}
