const OpenAI = require('openai');
const fs = require('fs');
const path = require('path');

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

exports.convertToSpeech = async (text) => {

  // OpenAI TTS call pannuvom
  const mp3 = await openai.audio.speech.create({
    model: 'tts-1',
    voice: 'alloy', 
    input: text,
  });

 
  const fileName = `reply_${Date.now()}.mp3`;
  const filePath = path.join(__dirname, '../../public/audio', fileName);

  const buffer = Buffer.from(await mp3.arrayBuffer());
  fs.writeFileSync(filePath, buffer);

  
  const audioUrl = `${process.env.SERVER_URL}/audio/${fileName}`;
  return audioUrl;
};