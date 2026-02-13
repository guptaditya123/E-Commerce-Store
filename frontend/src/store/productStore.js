
import { create } from "zustand";
import toast from "react-hot-toast";
import axios from "../lib/axios";

export const productStore = create((set)=>({
    products:[],
    featuredProducts:[],
    loading:false,

    setProducts:(products)=>set({products}),
    createProduct: async(productData)=>{
        set({loading:true});
        try {
            const res = await axios.post("/products/",productData);
            set((prevData)=>({
                products:[...prevData.products,res.data],
                loading:false,
            }))
        } catch (error) {
            toast.error(error.response.data.error || "Failed to fetch products")
        }
    },

    fetchAllProducts: async()=>{
        set({loading:true})
        try {
            const response = await axios.get('/products');
            set({products:response.data.products,loading:false});
        } catch (error) {
            set({ error: "Failed to fetch products", loading: false });
			toast.error(error.response.data.error || "Failed to fetch products");
        }
    },

    fetchProductsByCategory:async (category)=>{
        set({loading:true})
        try {
            const response = await axios.get(`/products/category/${category}`);
            set({products:response.data.products,loading:false});
        } catch (error) {
            set({error:"Failed to fetch products",loading:false});
            toast.error(error.response.data.error || "Failed to fetch products")
        }
    },

    deleteProduct:async(productId)=>{
        set({loading:true})
        try {
            await axios.delete(`/products/deleteProduct/${productId}`)
            set((prevData)=>({
                products:prevData.products.filter((product)=>product._id !== productId),
                loading:false
            }))
            toast.success("Product deleted successfully")
        } catch (error) {
            set({loading:false}),
            toast.error(error.response.data.error || "Failed to delete products")
        }
    },
    toggleFeaturedProduct:async(productId)=>{
        set({loading:false})
        try {
            const response = await axios.patch(`/products/${productId}`)
            toast.success(`Product ${response.data.isFeatured ? "marked as featured":"removed from featured"}`)
            set((prevProducts)=>({
                products:prevProducts.products.map((product)=>
                    product._id === productId ?{...product,isFeatured:response.data.isFeatured}:product
                ),
                loading:false
            }))
        } catch (error) {
            set({loading:false})
            toast.error(error.response.data.error || "Failed to update product")
        }
    },
    fetchFeaturedProducts: async()=>{
        set({loading:true})
        try {
            const response = await axios.get("/products/featuredProducts")
            set({featuredProducts:response.data,loading:false})
        } catch (error) {
            set({loading:false})
            toast.error(error.response.data.error || "Failed to fetch featured products")
        }
    },

    getProductById: async(id)=>{
        set({loading:true})
        try {
            const response = await axios.get(`/products/${id}`);
            set({loading:false})
            return response.data;
        } catch (error) {
            set({loading:false})
            toast.error(error.response.data.error || "Failed to fetch product")
            throw error;
        }
    }

}))