// backend/api/chat.js (Express.js route)
import express from 'express';
import OpenAI from 'openai';

const router = express.Router();
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY
});

const systemPrompt = `You are a helpful assistant for Pet-Mitra, a pet care service platform. 
Your role is to answer questions strictly related to pet care services, products, and 
website features. Politely decline to answer any unrelated queries. Keep responses 
concise and friendly. Current services include: pet grooming, veterinary consultations, 
pet sitting, and product delivery.`;

router.post('/api/chat', async (req, res) => {
  try {
    const completion = await openai.chat.completions.create({
      model: "gpt-3.5-turbo",
      messages: [
        { role: "system", content: systemPrompt },
        { role: "user", content: req.body.message }
      ],
      temperature: 0.7,
      max_tokens: 150
    });

    res.json({ reply: completion.choices[0].message.content });
  } catch (error) {
    console.error('OpenAI API Error:', error);
    res.status(500).json({ error: 'Error processing your request' });
  }
});

export default router;