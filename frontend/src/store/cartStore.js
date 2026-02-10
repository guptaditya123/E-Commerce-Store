import { create } from "zustand";
import axios from "../lib/axios";
import { toast } from "react-hot-toast";

export const cartStore = create((set, get) => ({
  cart: [],
  coupon: null,
  total: 0,
  subtotal: 0,
  isCouponApplied: false,


  getMyCoupon:async()=>{
    try{
      const response = await axios.get('/coupons');
      set({coupon:response.data})
    }catch(error){
      console.error("Error fetching coupon:",error);
    }
  },

  applyCoupon:async(code)=>{
    try{
      const response = await axios.post('/coupon/validate',{code});
      set({coupon:response.data,isCouponApplied:true});
      get().calculateTotals()
      toast.success("Coupon applied successfully");
    }catch(error){
      toast.error(error.response?.data?.message || "Failed to apply coupon");
    }
  },

  removeCoupon:async()=>{
    set({coupon:null,isCouponApplied:false})
    get().calculateTotals();
    toast.success("Coupon Removed");
  },

  couponHandler: async (code) => {
    try {
      const response = await axios.post("/coupon/create", {
        code,
        discountPercentage: 10, // You can make this dynamic as needed
      });
      set({ coupon: response.data, isCouponApplied: true });
      get().calculateTotals();
      toast.success("Coupon created and applied successfully"); 
      
    }
      catch (error) {
        toast.error(error.response?.data?.message || "Failed to apply coupon");
      }
  },

  getCartItems: async () => {
    try {
      const response = await axios.get("/cart/");
      set({ cart: response.data});
      get().calculateTotals();
    } catch (error) {
      console.error("Error fetching coupon:", error);
    }
  },

  addToCart: async (product) => {
    try {
      await axios.post("/cart/add", { productId: product._id });
      toast.success("Product added to cart");

      set((prevState) => {
        const existingItem = prevState.cart.find(
          (item) => item._id === product._id,
        );
        const newCart = existingItem
          ? prevState.cart.map((item) =>
              item._id === product._id
                ? { ...item, quantity: item.quantity + 1 }
                : item,
            )
          : [...prevState.cart, { ...product, quantity: 1 }];
        return { cart: newCart };
      });
      get().calculateTotals();
    } catch (error) {
      toast.error(error.response.data.message || "An error occurred");
    }
  },

  updateQuantity:async(productId,quantity)=>{
    if(quantity === 0){
      get().removeFromCart(productId)
      return;
    }
    const response = await axios.put(`/cart/update/${productId}`,{quantity})
    set({cart: response.data})
    get().calculateTotals()
  },

  removeFromCart:async(productId)=>{
    await axios.delete(`/cart/remove/`,{data:{productId}});
    set((prevState)=>({cart:prevState.cart.filter((item)=>item._id !== productId)}))
    get().calculateTotals()
  },

  clearCart:async()=>{
    set({cart:[],coupon:null,total:0,subtotal:0});
  },
  calculateTotals: () => {
    const { cart, coupon } = get();
    const subtotal = cart.reduce(
      (sum, item) => {
        return sum + item.price * item.quantity;
      },
      0,
    );
    let total = subtotal;
    if (coupon) {
      const discountAmount = (subtotal * coupon.discountPercentage) / 100;
      total -= discountAmount;
    }
    set({ subtotal, total });
  },
}));
