import express from 'express';
import { createPaymentIntent } from '../controllers/paymentController.js';
import { authMiddleware } from "../middleware/authorize.js";  

const router = express.Router();

// Route tạo PaymentIntent
router.post('/create-payment-intent',authMiddleware, createPaymentIntent);

export default router;
