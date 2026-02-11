import express from 'express';
import { protectRoute } from '../middleware/auth.middleware.js';
import { createCoupon, getCoupon, validateCoupon } from '../controllers/coupon.controller.js';

const couponRouter = express.Router();

couponRouter.get('/',protectRoute,getCoupon);
couponRouter.post('/',protectRoute,validateCoupon);
couponRouter.post('/create',createCoupon);

export default couponRouter;