const { PollyClient, SynthesizeSpeechCommand } = require("@aws-sdk/client-polly");
require("dotenv").config(); // Load environment variables
// Create Polly client
const pollyClient = new PollyClient({
  region: process.env.AWS_REGION, // Load region from .env
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

const synthesizeSpeechWithSSML = async (ssmlText, voiceId, outputFormat) => {
  try {
    const params = {
      Text: ssmlText,
      VoiceId: voiceId,
      OutputFormat: outputFormat,
      TextType: "ssml",
    };

    const command = new SynthesizeSpeechCommand(params);
    const response = await pollyClient.send(command);

    return response.AudioStream;
  } catch (error) {
    console.error("Error synthesizing speech:", error);
    throw error;
  }
};

module.exports = { synthesizeSpeechWithSSML };