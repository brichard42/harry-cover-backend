import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { OllamaModule } from './ollama/ollama.module';
import { CurriculumModule } from './curriculum/curriculum.module';

@Module({
  imports: [OllamaModule, CurriculumModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
