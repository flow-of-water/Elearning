import express from 'express';
import { stripeController } from '../controllers/stripeController.js';
import bodyParser from 'body-parser';
const router = express.Router();

// Route tạo PaymentIntent
router.post('/', stripeController);

export default router;
