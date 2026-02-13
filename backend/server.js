import express from "express";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.route.js";
import productRoutes from "./routes/product.route.js";
import cartRoutes from "./routes/cart.route.js";
import analyticsRoutes from "./routes/analytics.route.js"
import paymentRoutes from './routes/payment.route.js'
import { connectDB } from "./lib/db.js";
import cookieParser from "cookie-parser";
import couponRoutes from "./routes/coupon.route.js";
import cors from 'cors'
import morganMiddleware from "./lib/morgan.js";
import logger from "./lib/logger.js";


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json({ limit: '10mb' })); // use to parse user sending data into json
app.use(express.urlencoded({ extended: true, limit: '10mb' })); // parse URL-encoded data
app.use(cookieParser());
app.use(cors({
  origin: 'http://localhost:5173', // frontend URL
  credentials: true, // to allow cookies to be sent
}));
app.use(morganMiddleware);


// Routing
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/coupon", couponRoutes);
app.use("/api/payment", paymentRoutes);
app.use("/api/analytics",analyticsRoutes)

app.listen(PORT, () => {
  console.log(`server is started at port ${PORT}`);
  connectDB();
  logger.info(`Server started on port ${PORT}`);
});
