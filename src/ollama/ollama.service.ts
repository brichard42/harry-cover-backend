import { Injectable } from '@nestjs/common';
import { Ollama } from '@langchain/ollama';
import { ChatPromptTemplate } from '@langchain/core/prompts';
import { PDFLoader } from '@langchain/community/document_loaders/fs/pdf';
import { createStuffDocumentsChain } from 'langchain/chains/combine_documents';

@Injectable()
export class OllamaService {
  constructor() {}

  private readonly model = process.env.OLLAMA_MODEL;
  private readonly baseUrl = process.env.OLLAMA_URL;

  private readonly config = {
    model: this.model,
    baseUrl: this.baseUrl,
    temperature: 1,
    verbose: true,
  };

  private readonly prompt = ChatPromptTemplate.fromTemplate(`
    Write a Cover Letter for the Job Mentioned in the Job Description.
    Only write the letters body.
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

    const resp = await chain.invoke({
      context,
      input: jobDescription,
    });

    return resp;
  }
}

// const resp = `
//     ## BRICHARD

// **[Date]**

// **SUPERCOMPANY – [Address]**

// **Subject: Application for DevOps Engineer Position**

// Dear Hiring Manager,

// I am writing to express my keen interest in the DevOps Engineer position at SUPERCOMAPNY, as advertised on [website where you saw the advertisement]. My background in software engineering and dedication to automating complex systems perfectly align with your company’s focus on innovative solutions.

// As a skilled DevOps engineer with over one year of experience at BRICHARD, I have cultivated a passion for efficiency and problem-solving.  My work has focused on streamlining workflows, minimizing service disruptions through robust CI/CD pipelines, and driving significant cost savings in infrastructure management. For instance, [briefly mention an achievement that highlights your automation skills].

// I am proficient in a wide range of technologies, including:

// * **Tools:** AWS (EC2, IAM, RDS, Cognito, S3), Docker, Terraform, Kubernetes, Ansible, Jenkins, Segment, Datadog
// * **Programming Languages:** Python, TypeScript, C++, JavaScript, SQL
// * **Other relevant skills:**  REST API design, relational databases, data structures and algorithms, Agile methodologies

// My collaborative nature and strong communication abilities enable me to effectively work with cross-functional teams. I am excited about the opportunity to contribute my skills and enthusiasm to SUPERCOMAPNY's esteemed DevOps Expert Center.

// I am particularly drawn to your company’s commitment to sustainable and efficient IT architectures. My passion for delivering high-quality products through automated processes aligns perfectly with this goal, and I am eager to learn more about how I can contribute to your mission.

// My CV, attached to this letter, provides a more detailed overview of my qualifications and accomplishments.  Thank you for your time and consideration. I look forward to hearing from you soon.

// Sincerely,

// BRICHARD `;
