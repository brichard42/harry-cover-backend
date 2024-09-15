import { Injectable } from '@nestjs/common';
import { Ollama } from '@langchain/ollama';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';
import { Observable } from 'rxjs';

@Injectable()
export class OllamaService {
  constructor() { }

  private readonly model = process.env.OLLAMA_MODEL;
  private readonly baseUrl = process.env.OLLAMA_URL;

  private readonly config = {
    model: this.model,
    baseUrl: this.baseUrl,
    temperature: 1,
    verbose: process.env.AI_VERBOSE === 'true' || false,
  };

  private readonly prompt = ChatPromptTemplate.fromTemplate(`
    Write a Cover Letter for the Job Mentioned in the Job Description.
    Only write the letters content.
    Don't leave placeholders (eg: 'Dear [Hiring Manager name]',
    use generic words if needed (eg: 'Dear hiring manager')).
    Don't make any comments.
    Use the informations in the resume passed in your context.
    Context: {context}
    Job Description: {input}
  `);

  async createOllamaStream(
    jobDescription: string,
    resumeFile: Express.Multer.File,
  ) {
    const ollama = new Ollama(this.config);

    const chain = await createStuffDocumentsChain({
      llm: ollama,
      prompt: this.prompt,
    });

    const resumeFileBlob = new Blob([resumeFile.buffer]);

    const loader = new PDFLoader(resumeFileBlob, {
      parsedItemSeparator: '',
    });

    const context = await loader.load();

    //USE CHEERIO TO SCRAPE WEBSITES
    return new Observable(
      (subscriber) => {
        chain.stream({
          context,
          input: jobDescription,
        }).then(
          async (stream) => {
            for await (const message of stream) {
              subscriber.next(message);
            }
            subscriber.complete();
          },
          (error) => {
            subscriber.error(error);
          },
        )
      }
    )
  }
}