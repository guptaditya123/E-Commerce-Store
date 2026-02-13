import Product from "../models/product.model.js";


export const addCart = async (req, res) => {
    try {
        const { productId } = req.body;
        console.log("Product ID received in addCart:", productId);
        const user = req.user;

        if (!user) {
            return res.status(401).json({ message: "User not authenticated" });
        }
        
        const existingItem = user.cartItems.find(item => item.product && item.product.toString() === productId);
        
        if (existingItem) {
            existingItem.quantity += 1;
        } else {
            user.cartItems.push({ product: productId, quantity: 1 });
        }

        await user.save();
        res.json({ message: "Item added successfully", cart: user.cartItems });
    } catch (error) {
        console.log("Error in addToCart controller", error.message);
        res.status(500).json({ message: "Server error", error: error.message });
    }
}

export const removeAllFromCart = async(req,res)=>{
    try {
        const {productId} = req.body || {};
        const user = req.user;
        if(!productId){
            user.cartItems = [];
        }else{
            user.cartItems = user.cartItems.filter((item)=>item.product.toString() !== productId);
        }
        await user.save();
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

    const item = user.cartItems.find(item=>item.product.toString() === productId);
    if(item){
        if(quantity === 0){
            user.cartItems = user.cartItems.filter((item)=>item.product.toString() !== productId);
            await user.save();
            
            // Return full cart data with product details
            const productIds = user.cartItems.map(item => item.product);
            const products = await Product.find({_id:{$in:productIds}});
            const cartItems = products.map((product)=>{
                const cartItem = user.cartItems.find(item => item.product.toString() === product._id.toString());
                return {...product.toJSON(),quantity:cartItem.quantity}
            })
            return res.json(cartItems);
        }
        item.quantity = quantity;
        await user.save();
        
        // Return full cart data with product details
        const productIds = user.cartItems.map(item => item.product);
        const products = await Product.find({_id:{$in:productIds}});
        const cartItems = products.map((product)=>{
            const cartItem = user.cartItems.find(item => item.product.toString() === product._id.toString());
            return {...product.toJSON(),quantity:cartItem.quantity}
        })
        res.json(cartItems);
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
        const productIds = req.user.cartItems.map(item => item.product);
        const products = await Product.find({_id:{$in:productIds}});

        const cartItems = products.map((product)=>{
            const item = req.user.cartItems.find(item => item.product.toString() === product._id.toString());
            return {...product.toJSON(),quantity:item.quantity}

        })
        res.json(cartItems);
    } catch (error) {
        console.log("Error in fetching cart products",error.message);
        res.status(500).json({message:"Server Error",error:error.message});
    }
}