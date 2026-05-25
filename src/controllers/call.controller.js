const VoiceResponse = require('twilio').twiml.VoiceResponse;
const aiService = require('../services/ai.service');
const ttsService = require('../services/tts.service');


exports.handleIncoming = async (req, res) => {
  const twiml = new VoiceResponse();

  const gather = twiml.gather({
    input: 'speech',
    action: '/call/process-speech',
    language: 'en-US',
    speechTimeout: 'auto',
  });

  
  gather.say('Hello! Welcome to ABC  Company. How can I help you today?');

  res.type('text/xml');
  res.send(twiml.toString());
};


exports.processSpeech = async (req, res) => {
  const twiml = new VoiceResponse();

  try {
    
    const customerText = req.body.SpeechResult;
    console.log('Customer reply:', customerText);

   
    const aiReply = await aiService.getReply(customerText);
    console.log('AI reply:', aiReply);

    
    const audioUrl = await ttsService.convertToSpeech(aiReply);

   
    twiml.play(audioUrl);

   
    const gather = twiml.gather({
      input: 'speech',
      action: '/call/process-speech',
      language: 'en-US',
      speechTimeout: 'auto',
    });
    gather.say('Anything else I can help you with?');

  } catch (err) {
    console.error('Error:', err);
    twiml.say('Sorry, something went wrong. Please try again.');
  }

  res.type('text/xml');
  res.send(twiml.toString());
};