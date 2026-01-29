import React from 'react'
import {cartStore} from '../store/cartStore'
import {motion} from 'framer-motion'
import CartItem from '../components/CartItem'

const CartPage = () => {
    const {cart} = cartStore();
    console.log(cart);
  return (
    <div className='py-8 md:py-16'>
        <div className='mx-auto w-screen px-4 2xl:px-0'>
            <div className='mt-6 sm:mt-8 md:gap-6 lg:flex lg:items-start xl:gap-8'>
                <motion.div
                className='mx-auto w-full flex-none lg:max-w-2xl xl:max-w-4xl'
                initial={{opacity:0,x:-20}}
                animate = {{ opacity:1, x:0}}
                transition={{ duration:0.5,delay:0.2}}
                >
                    {cart.length === 0?(
                        <h2 className='text-2xl font-semibold text-gray-300 text-center col-span-full'>Your cart is empty</h2>
                    ):(
                        <div className='space-y-6'>
                            {cart.map((item)=>(
                                <CartItem key={item._id} item={item}/>
                            ))}
                        </div>
                    )}
                </motion.div>
                {cart.length > 0 && (
                    <motion.div
                    className='mx-auto mt-6 max-w-4xl flex-1 space-y-6 lg:mt-0 lg:w-full'
                    initial={{opacity:0,x:20}}
                    animate={{duration:0.5 , delay:0.4}}
                    >

                    </motion.div>
                )}
            </div>

        </div>
    </div>
  )
}

export default CartPage