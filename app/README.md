# Gide Application

This is the frontend application for the Gide project. It is a React application built using Vite.


## Project Structure

```bash
app/
├── src/ # React app
├── public/ # Static files
├── .env # Environment variables
├── .env.example # Environment variables example
```

### Tech Stack

- React
- Vite
- Tailwind CSS
- shadcn/ui
- Tanstack Query
- Tanstack Router
- React Hook Form
- Zod
- React PDF Viewer

## Quick Start

### Development Environment

1. **Install dependencies**

    ```bash
    npm install
    ```

> Problem with installation on Apple M1
> If the installed version of `pdfjs-dist` requires the canvas package which has issues with Apple M1. You can fix it by installing the canvas dependencies manually.
> The following lines show how to do it with Brew, a popular packages manager for macOS:
> $ brew install pkg-config cairo pango

2. **Create a `.env` file**

    You can use the `.env.example` file to create your own `.env` file.

    ```bash
    cp .env.example .env
    ```

3. **Run the development server**

    ```bash
    npm run dev
    ```

### Production Environment

1. **Install dependencies**

    ```bash
    npm install
    ```

2. **Create a `.env` file**

    You can use the `.env.example` file to create your own `.env` file.

    ```bash
    cp .env.example .env
    ```

3. **Build the production application** 

    ```bash
    npm run build
    ```

4. **Run the production server**

    ```bash
    npm run start
    ```

#### Environment Variables

The application uses the following environment variables:

- `VITE_API_URL`: The URL of the API ; supposely your AWS API Gateway URL.
