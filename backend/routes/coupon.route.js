import express from 'express';
import { protectRoute } from '../middleware/auth.middleware';


const couponRouter = express.Router();

couponRouter.get('/',protectRoute,getCoupon);
couponRouter.post('/',protectRoute,validateCoupon);

export default couponRouter;