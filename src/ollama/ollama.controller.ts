import { Controller, Body, Get, Res } from '@nestjs/common';
import { OllamaService } from './ollama.service';
import { OllamaMessageDto } from './dto/ollama-message.dto';

@Controller('ollama')
export class OllamaController {
  constructor(private readonly ollamaService: OllamaService) {}

  @Get('chat')
  async chat(
    @Body()
    body: {
      prompt: string;
    },
    @Res() res: any,
  ) {
    // Could add some tests here!
    return this.ollamaService.createOllamaStream(body.prompt);
  }
}
