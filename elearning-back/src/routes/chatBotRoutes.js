// routes/geminiRoutes.js
import express from 'express';
import { generateResponseController } from '../controllers/chatBotController.js';

const router = express.Router();

router.post('/generate', generateResponseController);

export default router;
