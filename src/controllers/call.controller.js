const VoiceResponse = require('twilio').twiml.VoiceResponse;
const aiService = require('../services/ai.service');
const ttsService = require('../services/tts.service');

exports.handleIncoming = async (req, res) => {
  const twiml = new VoiceResponse();

  const gather = twiml.gather({
    input: 'speech',
    action: '/call/process-speech',
    language: 'ta-IN',
    speechTimeout: 'auto',
  });

  gather.say({
    language: 'ta-IN',
    voice: 'Polly.Aditi'
  }, 'வணக்கம்! ABC Company-க்கு வரவேற்கிறோம். நான் உங்களுக்கு எப்படி உதவலாம்?');

  res.type('text/xml');
  res.send(twiml.toString());
};

exports.processSpeech = async (req, res) => {
  const twiml = new VoiceResponse();

  try {
    const customerText = req.body.SpeechResult;
    console.log('Customer said:', customerText);

    const aiReply = await aiService.getReply(customerText);
    console.log('AI reply:', aiReply);

    const audioUrl = await ttsService.convertToSpeech(aiReply);
    twiml.play(audioUrl);

    const gather = twiml.gather({
      input: 'speech',
      action: '/call/process-speech',
      language: 'ta-IN',
      speechTimeout: 'auto',
    });

    gather.say({
      language: 'ta-IN',
      voice: 'Polly.Aditi'
    }, 'வேறு ஏதாவது உதவி வேண்டுமா?');

  } catch (err) {
    console.error('Error:', err);
    twiml.say({
      language: 'ta-IN',
      voice: 'Polly.Aditi'
    }, 'மன்னிக்கவும், சிக்கல் ஏற்பட்டது. மீண்டும் முயற்சிக்கவும்.');
  }

  res.type('text/xml');
  res.send(twiml.toString());
};
