import { useState } from "react";
import axios from "axios";
import {
  Box,
  Button,
  Card,
  CardContent,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Slider,
  TextField,
  Typography,
} from "@mui/material";

const TextToSpeech = () => {
  const [text, setText] = useState("");
  const [voiceId, setVoiceId] = useState("Joanna");
  const [outputFormat, setOutputFormat] = useState("mp3");
  const [pitch, setPitch] = useState(0);
  const [speed, setSpeed] = useState(1.0);
  const [audioSrc, setAudioSrc] = useState("");

  const voiceOptions = [
    "Joanna",
    "Matthew",
    "Ivy",
    "Justin",
    "Kendra",
    "Kimberly",
  ];

  const formatOptions = ["mp3", "ogg_vorbis", "pcm"];

  const handleConvert = async () => {
    if (!text.trim()) {
      alert("Please enter text to convert.");
      return;
    }

    try {
      const pitchPercentage = `${pitch * 10}%`;
      const speedPercentage = `${speed * 100}%`;
      const ssmlText = `
    <speak>
      <prosody pitch="${pitchPercentage}" rate="${speedPercentage}">
        ${text}
      </prosody>
    </speak>
  `;
      const response = await axios.post("http://localhost:3000/text-to-speech",
         {
        text: ssmlText,
        voiceId,
        outputFormat,
        useSSML: true
      }
      , { responseType: "blob" });

      const audioURL = URL.createObjectURL(new Blob([response.data]));
      setAudioSrc(audioURL);
    } catch (error) {
      console.error("Error converting text to speech:", error);
      alert("An error occurred. Please try again.");
    }
  };

  return (
    <Box
    sx={{
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      gap: 2,
      height: "100vh", // Optional: Height for better visibility
      width: "100vw",
      textAlign: "center",
      backgroundColor: "#f5f5f5", // Optional: Background color for better visibility
    }}
    >
      <Card sx={{ maxWidth: 600, p: 3, boxShadow: 3, display: "flex",
    justifyContent: "center", alignItems: "center", width: "200vw" }}>
        <CardContent>
          <Typography variant="h4" gutterBottom>
            Text to Speech Converter
          </Typography>

          <TextField
            label="Enter Text"
            multiline
            rows={4}
            fullWidth
            variant="outlined"
            value={text}
            onChange={(e) => setText(e.target.value)}
            sx={{ mb: 3 }}
          />

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="voice-select-label">Voice</InputLabel>
            <Select
              labelId="voice-select-label"
              value={voiceId}
              onChange={(e) => setVoiceId(e.target.value)}
            >
              {voiceOptions.map((voice) => (
                <MenuItem key={voice} value={voice}>
                  {voice}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <FormControl fullWidth sx={{ mb: 3 }}>
            <InputLabel id="format-select-label">File Format</InputLabel>
            <Select
              labelId="format-select-label"
              value={outputFormat}
              onChange={(e) => setOutputFormat(e.target.value)}
            >
              {formatOptions.map((format) => (
                <MenuItem key={format} value={format}>
                  {format}
                </MenuItem>
              ))}
            </Select>
          </FormControl>

          <Typography gutterBottom>Pitch: {pitch}%</Typography>
          <Slider
            value={pitch}
            min={-10}
            max={10}
            step={1}
            valueLabelDisplay="auto"
            onChange={(e, newValue) => setPitch(newValue)}
            sx={{ mb: 3 }}
          />

          <Typography gutterBottom>Speed: {speed}</Typography>
          <Slider
            value={speed}
            min={0.5}
            max={2}
            step={0.1}
            valueLabelDisplay="auto"
            onChange={(e, newValue) => setSpeed(newValue)}
            sx={{ mb: 3 }}
          />

          <Button
            variant="contained"
            color="primary"
            onClick={handleConvert}
            sx={{ mr: 2 }}
          >
            Convert
          </Button>

          {audioSrc && (
            <Box sx={{ mt: 3 }}>
              <audio controls src={audioSrc} style={{ width: "100%" }} />
              <Button
                variant="outlined"
                color="secondary"
                sx={{ mt: 2 }}
                href={audioSrc}
                download={`speech.${outputFormat}`}
              >
                Download
              </Button>
            </Box>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default TextToSpeech;