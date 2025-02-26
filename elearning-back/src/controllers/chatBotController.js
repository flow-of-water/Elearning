// controllers/geminiController.js
import { GoogleGenerativeAI } from '@google/generative-ai';
import dotenv from 'dotenv';

dotenv.config();

const client = new GoogleGenerativeAI(
  process.env.GEMINI_API_KEY,
);
const model = client.getGenerativeModel({ model: "gemini-2.0-flash" });
export const generateResponseController = async (req, res) => {
  try {
    const { prompt } = req.body;
    const result = await model.generateContent("Limit in 5 sentences: "+prompt);
    // console.log(result.response.text())
    res.json(result.response.text());
  } catch (error) {
    console.error('Error generating response:', error);
    res.status(500).send('Internal Server Error');
  }
};
