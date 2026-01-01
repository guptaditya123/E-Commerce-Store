import Product from "../models/product.model";

export const addCart = async (req,res)=>{
    try {
        const {productId} = req.body;
        const user = req.user;
        const existingItem = user.cartItems.find(item => item.id === productId);             
        if(existingItem){
            existingItem.quantity += 1;
        }else{
            user.cartItems.push(productId);
        }

        await user.save();
        res.json({message:"Item added successfully",cart:user.cartItems})
    } catch (error) {
     console.log("Error in addToCart controller",error.message);
     res.status(500).json({message:"Server error",error:error.message});
    }
}

export const removeAllFromCart = async(req,res)=>{
    try {
        const {productId} = req.body;
        const user = req.user;
        if(!productId){
            user.cartItems = [];
        }else{
            user.cartItems = user.cartItems.filter((item)=>item.id !== productId);
        }
        res.status(200).json({message:"Item deleted successfully",cart:user.cartItems})
    } catch (error) {
        console.log("Error while removing the product",error.message);
        res.status(500).json({message:"Server Error",error:error.message});
    }
}

export const updateQuantity = async(req,res)=>{
   try{
     const {id:productId} = req.params;
     const {quantity} = req.body;
    const user = req.user;

    const item = user.cartItems.find(item=>item.id === productId);
    if(item){
        if(quantity === 0){
            user.cartItems = user.cartItems.filter((item)=>item.id === productId);
            await user.save();
            return res.json(user.cartItems);
        }
        item.quantity = quantity;
        await user.save();
        res.json(user.cartItems);
    }else{
        res.status(404).json({message:"Product not found"});
    }
}
    catch(err){
        console.log(err.message);
        res.status(500).json({message:"Error in deleting updating the product",error:err.message})
    }

}

export const getCartProducts = async(req,res)=>{
    try {
        const products = await Product.find({_id:{$in:req.user.cartItems}});

        const cartItems = products.map((product)=>{
            const item = req.user.cartItems.find(item => item.id === product.id);
            return {...product.toJSON(),quantity:item.quantity}

        })
        res.json(cartItems);
    } catch (error) {
        console.log("Error in fetching cart products",error.message);
        res.status(500).json({message:"Server Error",error:error.message});
    }
}