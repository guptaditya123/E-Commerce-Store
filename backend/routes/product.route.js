import express from "express"
import { getAllProducts } from "../controllers/product.controller.js";

const productRouter = express.Router()

productRouter.get('/',getAllProducts)


export default productRouter;