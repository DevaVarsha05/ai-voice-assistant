const OpenAI = require('openai');

const openai = new OpenAI({ 
  apiKey: process.env.OPENAI_API_KEY 
});

exports.getReply = async (customerText) => {
  
  const response = await openai.chat.completions.create({
    model: 'gpt-4',
    messages: [
      {
        role: 'system',
      
        content: `You are a helpful customer support assistant 
                  for ABC  Company. 
                  
                  Reply in short and friendly manner.
                  Reply in the same language customer speaks.`
      },
      {
        role: 'user',
        content: customerText
      }
    ]
  });

  return response.choices[0].message.content;
};