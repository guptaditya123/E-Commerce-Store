import coupon from "../models/coupon.model.js";

export const getCoupon = async(req,res)=>{
    try {
        // const userCoupon = await coupon.findOne({userId:req.user._id, isActive:true});
        const coupons = await coupon.find()
        if(!coupons){
            return res.status(404).json({message:"No active coupon found for this user."});
        }
        res.status(200).json(coupons);


    } catch (error) {
        res.status(500).json({message:"Server Error", error:error.message});
    }
}

const formatDate=(date)=>{
    const d= new Date(date);
    const month=d.getMonth()+1;
    const day=d.getDate();
    const year=d.getFullYear();
    return `${month.toString().padStart(2, '0')}/${day.toString().padStart(2, '0')}/${year}`;
}
export const createCoupon = async(req,res)=>{
    try {
        const {code, discountPercentage, expirationDate,id} = req.body;
        console.log("Received coupon data:", {code, discountPercentage, expirationDate, id});
        const existingCoupon = await coupon.findOne({code:code, userId:id});
        if(existingCoupon){
            return res.status(400).json({message:"You already have a coupon with this code."});
        }
        const formattedDate = formatDate(expirationDate);
        const newCoupon = await coupon.create({
            userId:id,
            code,
            discountPercentage,
            expirationDate: formattedDate
        });
        res.status(201).json(newCoupon);
    } catch (error) {
        res.status(500).json({message:"Server Error", error:error.message});
    }
}
export const validateCoupon = async(req,res)=>{
    try {
        const {code} = req.body;
        const foundCoupon = await coupon.findOne({code:code, userId:req.user._id, isActive:true});
        if(!foundCoupon){
            return res.status(404).json({message:"Invalid or inactive coupon."});
        }
        if(new Date() > foundCoupon.expirationDate){
            foundCoupon.isActive = false;
            await foundCoupon.save();
            return res.status(400).json({message:"Coupon has expired."});
        }
        res.status(200).json({message:"Coupon is valid.", code:foundCoupon.code ,discountPercentage:foundCoupon.discountPercentage});
    } catch (error) {
        res.status(500).json({message:"Server Error", error:error.message});
    }
}