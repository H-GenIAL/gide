# GIDE - Guided Interactive Document Experience

GIDE is a web application that provides an interactive document experience using RAG (Retrieval-Augmented Generation) technology. It allows users to upload and analyze PDF documents, with a modern React frontend and AWS Lambda-powered backend.

## Project Structure

```
gide/
├── app/                    # Frontend React application
│   ├── src/
│   │   ├── components/    # React components
│   │   ├── contexts/      # React contexts
│   │   ├── routes/        # Application routes
│   │   └── main.tsx       # Application entry point
│   └── package.json       # Frontend dependencies
│
├── api/                    # Backend AWS Lambda functions
│   └── functions/
│       ├── generate/      # RAG generation Lambda
│       └── export/        # Data export Lambda
│
└── venv/                  # Python virtual environment
```

## Installation

### Frontend (React Application)

1. Navigate to the app directory:
```bash
cd app
```

2. Install dependencies using pnpm:
```bash
pnpm install
```

3. Start the development server:
```bash
pnpm dev
```

The application will be available at `http://localhost:5173`

### Backend (AWS Lambda Functions)

1. Create a Python virtual environment:
```bash
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate
```

2. Install Python dependencies:
```bash
cd api/functions
pip install -r requirements.txt
```

## AWS Setup

### Lambda Functions

The project uses two main Lambda functions:

1. **Generate Function** (`/api/functions/generate`)
   - Handles the RAG (Retrieval-Augmented Generation) processing
   - Processes PDF documents and generates responses
   - Memory: 1024 MB (recommended)
   - Timeout: 30 seconds

2. **Export Function** (`/api/functions/export`)
   - Handles data export functionality
   - Processes and formats data for export
   - Memory: 512 MB (recommended)
   - Timeout: 15 seconds

### API Gateway Setup

1. Create a new REST API in API Gateway
2. Create the following endpoints:
   - POST `/generate` → Generate Lambda
   - POST `/export` → Export Lambda
3. Enable CORS for the frontend domain
4. Deploy the API to a stage (e.g., 'prod')

## Architecture Overview

### Frontend

- Built with React 18, TypeScript, and Vite
- Uses TanStack Router for routing
- PDF viewing capabilities with `@react-pdf-viewer`
- Form handling with `react-hook-form` and Zod validation
- Modern UI components using Radix UI
- Styling with Tailwind CSS

### Backend

The backend uses a RAG (Retrieval-Augmented Generation) architecture:

1. **Document Processing**
   - PDFs are uploaded through the frontend
   - Documents are processed and chunked for efficient retrieval
   - Text is extracted and embedded for semantic search

2. **RAG Pipeline**
   - Uses vector embeddings for semantic search
   - Retrieves relevant context from the document
   - Generates responses based on the retrieved context

3. **API Communication**
   - Frontend communicates with backend through REST API
   - AWS API Gateway handles request routing
   - Lambda functions process requests asynchronously

## Environment Variables

### Frontend (.env)
```
VITE_API_URL=your_api_gateway_url
```

### Backend
Configure through AWS Lambda environment variables:
- `OPENAI_API_KEY`: Your OpenAI API key
- Other necessary API keys and configuration

## Security Considerations

- API keys are stored securely in AWS Lambda environment variables
- CORS is configured to allow only specific origins
- API Gateway handles request authentication
- File uploads are validated and sanitized

## Development Workflow

1. Make changes to the frontend code
2. Test locally using `pnpm dev`
3. Build for production using `pnpm build`
4. Deploy Lambda functions through AWS Console or CLI
5. Update API Gateway configuration if needed

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
