import express from "express";
import { addCart } from "../controllers/cart.controller.js";
import { protectRoute } from "../middleware/auth.middleware";


const cartRouter = express.Router();

cartRouter.post('/add',protectRoute,addCart)
cartRouter.delete('/remove',protectRoute,removeAllFromCart)
cartRouter.put('/update/:id',protectRoute,updateQuantity);
cartRouter.get('/',protectRoute,getCartProducts);



export default cartRouter;
