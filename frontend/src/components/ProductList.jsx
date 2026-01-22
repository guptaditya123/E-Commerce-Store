import React from 'react'
import {motion} from 'framer-motion'
import { Star, Trash } from 'lucide-react'

const ProductList = () => {

  const products = [
    {
      _id:'1',
      name:'Sample Product 1',
      price:29.99,
      category:'Category A',
      featured:true
    },
    {
      _id:'2',
      name:'Sample Product 2',
      price:19.99,
      category:'Category B',
      featured:false
    }
  ]
    

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
          {products.map((product) => (
            <tr key={product._id} className='hover:bg-gray-700'>
              <td className='px-6 py-4 whitespace-nowrap '>
                {product.name}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                ${product.price.toFixed(2)}
              </td>
              <td className='px-6 py-4 whitespace-nowrap text-sm text-gray-300'>
                {product.category}
              </td>
             			<td className='px-6 py-4 whitespace-nowrap'>
								<button
									onClick={() => toggleFeaturedProduct(product._id)}
									className={`p-1 rounded-full ${
										product.featured ? "bg-yellow-400 text-gray-900" : "bg-gray-600 text-gray-300"
									} hover:bg-yellow-500 transition-colors duration-200`}
								>
									<Star className='h-5 w-5' />
								</button>
							</td>
              <td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
								<button
									onClick={() => deleteProduct(product._id)}
									className='text-red-400 hover:text-red-300'
								>
									<Trash className='h-5 w-5' />
								</button>
							</td>
            </tr>
          ))}
        </tbody>
      </table>
    </motion.div>
  )
}

export default ProductList