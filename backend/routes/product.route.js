import express from "express"
import { getAllProducts, getFeaturedProducts } from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const productRouter = express.Router()

productRouter.get('/',protectRoute,adminRoute,getAllProducts);
productRouter.get('/featuredProducts',getFeaturedProducts);
productRouter.post('/createProduct',protectRoute,adminRoute,createProduct);
productRouter.post('/deleteProduct/:id',protectRoute,adminRoute,deleteProduct);



export default productRouter;