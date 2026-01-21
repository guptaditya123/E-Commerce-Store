import React from 'react'
import {motion} from 'framer-motion'

const ProductList = () => {

  

  return (
    <motion.div
    className='bg-gray-800 shadow-lg rounded-lg overflow-hidden max-w-4xl mx-auto'
    initial={{opacity:0 , y:20}}
    animate={{opacity:1,y:0}}
    transition={{duration:0.8}}
    >
      <table className='min-w-full'> 
        <thead className='bg-gray-700'>
          <tr>
            <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Product
            </th>
            <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >
              Price
            </th>
            <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >Category</th>
            <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >Featured</th>
            <th
            scope='col'
            className='px-6 py-3 text-left text-xs font-medium text-gray-300 uppercase tracking-wider'
            >Actions</th>
          </tr>
        </thead>
        <tbody className='bg-gray-800 divide-y divide-gray-700'>

        </tbody>
      </table>
    </motion.div>
  )
}

export default ProductList