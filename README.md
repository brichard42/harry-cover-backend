# Harry Cover

Harry Cover is a platform that generates cover letters based on a CV, job description, and company Wiki or description.

## Technologies Used

- **Ollama**: Serves the local LLM model.
- **Langchain JS Library**: Accesses the local LLM model.
- **Custom API Route**: Created a `POST` route at `/ollama/generate-cover-letter` that receives:
  - `jobDescription` (string)
  - `resumeFile` (File, PDF)
  - Returns a response with:
    ```json
    {
      "success": true,
      "data": "string"
    }
    ```

## Installation

### Prerequisites

- **Ollama**: Ensure Ollama is installed.
- **Model**: At least one model should be pulled and served.
- **Node.Js**: >= 16
- **NestJS Cli**: ```npm i -g @nestjs/cli```

### Environment Variables

Create a `.env` file with the following variables:

- `PORT`: Application port (e.g., `3001`)
- `OLLAMA_URL`: Your Ollama local server URL (e.g., `http://127.0.0.1:11434`)
- `OLLAMA_MODEL`: The LLM model you want to use (e.g., `gemma2:2b`)

## Additional Information

- **Model Choice**: Using `gemma2:2b` locally because it offers good performance and can run on CPU.
- **Hosting**: Hosting the model with Cloudflare so the frontend can access it.
