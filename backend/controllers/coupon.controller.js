

export const getCoupon = async(req,res)=>{
    try {
        const coupon = await coupon.findOne({userId:req.user._id, isActive:true});
        if(!coupon){
            return res.status(404).json({message:"No active coupon found for this user."});
        }
        res.status(200).json(coupon);


    } catch (error) {
        res.status(500).json({message:"Server Error", error:error.message});
    }
}

export const validateCoupon = async(req,res)=>{
    try {
        const {code} = req.body;
        const coupon = await coupon.findOne({code:code, userId:req.user._id, isActive:true});
        if(!coupon){
            return res.status(404).json({message:"Invalid or inactive coupon."});
        }
        if(new Date() > coupon.expirationDate){
            coupon.isActive = false;
            await coupon.save();
            return res.status(400).json({message:"Coupon has expired."});
        }
        res.status(200).json({message:"Coupon is valid.", discountPercentage:coupon.discountPercentage});
    } catch (error) {
        res.status(500).json({message:"Server Error", error:error.message});
    }
}