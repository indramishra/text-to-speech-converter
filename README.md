# Text-to-Speech Converter

This project is a Text-to-Speech (TTS) converter that uses AWS Polly to convert text into speech. It consists of two main parts: a frontend built with React and Vite, and a backend built with Express and AWS SDK.

## Features

- Convert text to speech using different voices and formats.
- Adjust pitch and speed of the speech.
- Download the generated speech file.

## Prerequisites

- Node.js and npm installed on your machine.
- AWS account with access to Polly service.
- AWS credentials set up in a `.env` file.

## Setup

### Backend (tts-api)

1. Navigate to the `tts-api` directory:
   ```sh
   cd tts-api
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Create a `.env` file in the `tts-api` directory with your AWS credentials:
   ```properties
   AWS_ACCESS_KEY_ID=your_access_key_id
   AWS_SECRET_ACCESS_KEY=your_secret_access_key
   AWS_REGION=your_aws_region
   ```

4. Start the backend server:
   ```sh
   node app.js
   ```

### Frontend (tts-ui)

1. Navigate to the `tts-ui` directory:
   ```sh
   cd tts-ui
   ```

2. Install the dependencies:
   ```sh
   npm install
   ```

3. Start the frontend development server:
   ```sh
   npm run dev
   ```

## Usage

1. Open your browser and navigate to `http://localhost:3000` to access the frontend.
2. Enter the text you want to convert to speech.
3. Select the voice, file format, pitch, and speed.
4. Click the "Convert" button to generate the speech.
5. Listen to the generated speech or download the file.

