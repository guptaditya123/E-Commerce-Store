import express from "express"
import { deleteProduct, getAllProducts, getFeaturedProducts ,getRecommendedProduct,getProductByCategory,createProduct,toggleFeaturedProduct } from "../controllers/product.controller.js";
import { adminRoute, protectRoute } from "../middleware/auth.middleware.js";

const productRouter = express.Router()

productRouter.get('/',protectRoute,adminRoute,getAllProducts);
productRouter.get('/featuredProducts',getFeaturedProducts);
productRouter.post('/recommendations',getRecommendedProduct);
productRouter.post('/category/:category',getProductByCategory)
productRouter.post('/',protectRoute,adminRoute,createProduct);
productRouter.delete('/deleteProduct/:id',protectRoute,adminRoute,deleteProduct);
productRouter.patch('/:id',protectRoute,adminRoute,toggleFeaturedProduct)






export default productRouter;