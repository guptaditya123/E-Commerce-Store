import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';

const paymentRouter = express.Router();

paymentRouter.post('/create-checkout-session',protectRoute,)


export default paymentRouter;