import React from 'react'
import { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { productStore } from '../store/productStore';
import { cartStore } from '../store/cartStore';
import { userStore } from '../store/userStore';
import { motion } from 'framer-motion';
import { ShoppingCart, ArrowLeft, Star } from 'lucide-react';
import LoadingSpinner from '../components/LoadingSpinner';

const ProductDetailPage = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const { getProductById, loading } = productStore();
    const { addToCart } = cartStore();
    const [product, setProduct] = useState(null);
    const [selectedImage, setSelectedImage] = useState(0);
    
    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await getProductById(id);
                setProduct(res);
            } catch (error) {
                console.error("Error fetching product:", error);
            }
        };
        fetchProduct();
    }, [id, getProductById]);


    if (loading || !product) {
        return <LoadingSpinner />;
    }

    // Create array of images (using same image for demo - can be extended to multiple images)
    const images = [product.image, product.image, product.image, product.image];

    return (
        <div className='py-8 md:py-16'>
            <div className='mx-auto max-w-screen-xl px-4 2xl:px-0'>
                {/* Back Button */}
                <motion.button
                    onClick={() => navigate(-1)}
                    className='mb-6 flex items-center gap-2 text-emerald-400 hover:text-emerald-300 transition-colors'
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                >
                    <ArrowLeft size={20} />
                    <span>Back</span>
                </motion.button>

                <div className='lg:flex lg:gap-8 xl:gap-12'>
                    {/* Product Image Gallery */}
                    <motion.div
                        className='flex-1 lg:max-w-2xl'
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.2 }}
                    >
                        {/* Main Image */}
                        <div className='relative overflow-hidden rounded-lg border border-gray-700 shadow-xl mb-4'>
                            <img
                                src={images[selectedImage]}
                                alt={product.name}
                                className='w-full h-auto object-cover max-h-[600px]'
                            />
                        </div>
                        
                        {/* Thumbnail Gallery */}
                        <div className='grid grid-cols-4 gap-3'>
                            {images.map((image, index) => (
                                <motion.button
                                    key={index}
                                    onClick={() => setSelectedImage(index)}
                                    className={`relative overflow-hidden rounded-lg border-2 transition-all ${
                                        selectedImage === index 
                                            ? 'border-emerald-500 ring-2 ring-emerald-500/50' 
                                            : 'border-gray-700 hover:border-emerald-600'
                                    }`}
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                >
                                    <img
                                        src={image}
                                        alt={`${product.name} view ${index + 1}`}
                                        className='w-full h-20 object-cover'
                                    />
                                    {selectedImage === index && (
                                        <div className='absolute inset-0 bg-emerald-500/10' />
                                    )}
                                </motion.button>
                            ))}
                        </div>
                    </motion.div>

                    {/* Product Details */}
                    <motion.div
                        className='flex-1 mt-8 lg:mt-0'
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.5, delay: 0.4 }}
                    >
                        <div className='space-y-6'>
                            {/* Category Badge */}
                            <div>
                                <span className='inline-block px-3 py-1 text-xs font-medium rounded-full bg-emerald-600/20 text-emerald-400 border border-emerald-600/30'>
                                    {product.category}
                                </span>
                            </div>

                            {/* Product Name */}
                            <h1 className='text-3xl md:text-4xl font-bold text-white'>
                                {product.name}
                            </h1>

                            {/* Price */}
                            <div className='border-t border-b border-gray-700 py-4'>
                                <span className='text-4xl font-bold text-emerald-400'>
                                    ${product.price}
                                </span>
                            </div>

                            {/* Description */}
                            <div>
                                <h3 className='text-lg font-semibold text-white mb-3'>
                                    Description
                                </h3>
                                <p className='text-gray-300 leading-relaxed'>
                                    {product.description || 'No description available for this product.'}
                                </p>
                            </div>

                            {/* Stock Status */}
                            <div className='flex items-center gap-2'>
                                <div className='h-2 w-2 rounded-full bg-emerald-500'></div>
                                <span className='text-sm text-gray-300'>In Stock</span>
                            </div>

                            {/* Add to Cart Button */}
                            <motion.button
                                onClick={() => addToCart(product)}
                                className='w-full flex items-center justify-center gap-2 rounded-lg bg-emerald-600 px-6 py-4 text-base font-medium text-white hover:bg-emerald-700 focus:outline-none focus:ring-4 focus:ring-emerald-300 transition-colors'
                                whileHover={{ scale: 1.02 }}
                                whileTap={{ scale: 0.98 }}
                            >
                                <ShoppingCart size={22} />
                                Add to Cart
                            </motion.button>

                            {/* Additional Info */}
                            <div className='border-t border-gray-700 pt-6 space-y-3'>
                                <div className='flex items-center justify-between text-sm'>
                                    <span className='text-gray-400'>Product ID</span>
                                    <span className='text-gray-300 font-mono'>{product._id.slice(-8)}</span>
                                </div>
                                {product.isFeatured && (
                                    <div className='flex items-center gap-2 px-4 py-2 rounded-lg bg-yellow-600/20 border border-yellow-600/30'>
                                        <Star size={16} className='text-yellow-400 fill-yellow-400' />
                                        <span className='text-sm text-yellow-400 font-medium'>Featured Product</span>
                                    </div>
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetailPage