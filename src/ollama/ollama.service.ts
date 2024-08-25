import { HttpService } from '@nestjs/axios';
import { Injectable } from '@nestjs/common';

@Injectable()
export class OllamaService {
  constructor(private readonly httpService: HttpService) {}

  private readonly model = 'gemma2:2b';
  private readonly config = {
    responseType: 'stream',
  };
  private readonly url = 'http://127.0.0.1:11434/api/generate';

  async createOllamaStream(prompt: string) {}
}
