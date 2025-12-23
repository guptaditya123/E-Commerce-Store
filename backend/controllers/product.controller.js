import Product from "../models/product.model.js";

export const getAllProducts = async()=>{
    try{
        const products = await Product.find({});
        res.status(200).json({products})
    }catch(err){
        console.log(err)
        res.status(500).json("Internal server error")
    }
}