# GenIAL

GenIAL is an innovative document analysis tool developed during a hackathon for Gide, a leading international law firm. The application streamlines the audit process by automatically analyzing PDF documents using Large Language Models (LLM) and generating structured audit reports in Word format based on predefined templates.

## Overview

The application simplifies the document review process through:
1. **PDF Upload**: Users can easily upload PDF documents for analysis
2. **Intelligent Processing**: Utilizes RAG (Retrieval-Augmented Generation) technology to comprehend and extract relevant information
3. **Automated Reporting**: Generates professional Word documents following Gide's audit template format

## Project Structure

```
genial/
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
│       └── export/        # Word document export Lambda
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
cd api/functions/<function_name>
pip install -r requirements.txt
```

## AWS Setup

### Lambda Functions

The project uses two main Lambda functions:

1. **Generate Function** (`/api/functions/generate`)
   - Processes uploaded PDFs using RAG technology
   - Extracts and analyzes relevant information using LLM
   - Structures data for audit report generation
   - Memory: 1024 MB (recommended)
   - Timeout: 10 minutes (recommended)

2. **Export Function** (`/api/functions/export`)
   - Generates Word documents based on templates
   - Formats extracted data into structured audit reports
   - Creates professional-grade documentation
   - Memory: 512 MB (recommended)
   - Timeout: 30 seconds (recommended)

### API Gateway Setup

1. Create a new REST API in API Gateway
2. Create the following endpoints:
   - POST `/generate` → Generate Lambda (PDF processing)
   - POST `/export` → Export Lambda (Word document generation)
3. Enable CORS for the frontend domain
4. Deploy the API to a stage (e.g., 'prod')

## Architecture Overview

### Frontend

- Built with React 18, TypeScript, and Vite
- Interactive PDF viewer with `@react-pdf-viewer`
- Form handling with `react-hook-form` and Zod validation
- Modern UI components using Radix UI
- Responsive design with Tailwind CSS

### Backend

The backend implements a sophisticated document processing pipeline:

1. **Document Analysis**
   - PDF document upload and text extraction
   - Document segmentation for detailed analysis
   - Intelligent content processing using RAG technology

2. **LLM Processing**
   - Context-aware information extraction
   - Structured data generation for audit reports
   - Quality assurance checks on extracted information

3. **Report Generation**
   - Template-based Word document creation
   - Professional formatting and styling
   - Consistent with Gide's documentation standards

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

- Secure document handling and processing
- API keys stored securely in AWS Lambda environment variables
- CORS configuration for protected endpoints
- Input validation for all file uploads
- Secure document storage and transmission

## Development Workflow

1. Make changes to the frontend code
2. Test locally using `pnpm dev`
3. Build for production using `pnpm build`
4. Deploy Lambda functions through AWS Console or CLI
5. Update API Gateway configuration if needed

## Hackathon Context

This project was developed during a hackathon in collaboration with Gide. It addresses the specific challenge of automating and streamlining the document audit process, demonstrating the potential of AI-powered solutions in legal document processing.

## Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## License

This project is licensed under the MIT License - see the LICENSE file for details.
