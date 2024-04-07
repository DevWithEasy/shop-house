import React from 'react';
import { RxCross2 } from 'react-icons/rx';
import useProductStore from '../../store/productStore';

const Product_list_invoice = () => {
    const {cart,adjustQuantity,removeCart} = useProductStore()
    return (
        <div className="relative overflow-x-auto w-8/12">
        <table className="w-full text-sm text-left text-gray-500 border">
            <thead className="text-xs text-gray-700 uppercase bg-blue-50">
                <tr>
                    <th scope="col" className="px-2 py-2 text-center">
                        Sl
                    </th>
                    <th scope="col" className="px-6 py-2 text-center">
                        Name
                    </th>
                    <th scope="col" className="p-2 text-center">
                        Price
                    </th>
                    <th scope="col" className="px-6 py-2 text-center">
                        Quantity
                    </th>
                    <th scope="col" className="px-6 py-2 text-center">
                        Total Price
                    </th>
                    <th scope="col" className="p-2 text-center">
                        Action
                    </th>
                </tr>
            </thead>
            <tbody>
                {cart &&
                    cart.map((product, i) => <tr
                        key={product._id}
                        className='bg-white border-b'
                    >
                        <td className='p-2 text-center'>
                            {i + 1}
                        </td>
                        <td className='px-6 py-2'>
                            {product?.name}
                        </td>
                        <td className='p-2 text-center'>
                            {product?.price}
                        </td>
                        <td className='px-6 py-2 text-center'>
                            <input
                                name={product._id}
                                type='number'
                                value={product?.quantity}
                                onChange={(e) => adjustQuantity(product._id,e.target.value)}
                                className='p-1 border text-center focus:outline-none focus:border-sky-500 rounded-md'
                            />
                        </td>
                        <td className='px-6 py-2 text-center'>
                            {product?.price * product?.quantity}
                        </td>
                        <td className='p-2 text-center flex justify-center  text-red-500'>
                            <RxCross2
                                onClick={() => removeCart(product._id)}
                                size={20}
                                className='cursor-pointer'
                            />
                        </td>
                    </tr>)
                }
            </tbody>
        </table>
    </div>
    );
};

export default Product_list_invoice;