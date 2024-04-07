import React from 'react';

const ProductListItem_Home = ({ product }) => {

    return (
        <tr className={`bg-white border-b ${product.quantity === 0 ? 'text-red-500' : ''}`}>
            <th scope="row" className="px-2 py-2 font-medium whitespace-nowrap">
                {product?.name}
            </th>
            <td className="px-6 py-2 text-center">
                {product?.brand?.name}
            </td>
            <td className="px-6 py-2 text-center">
                {product?.model}
            </td>
            <td className="px-6 py-2 text-center">
                {product?.size}
            </td>
            <td className="px-6 py-2 text-center">
                {product?.price}
            </td>
            <td className="px-6 py-2 text-center">
                {product?.quantity}
            </td>
            <td className="px-6 py-2 flex justify-center items-center space-x-2">
                <a
                    href={product?.barCode}
                    download={product?.name}
                >
                    <img src={product?.barCode} className='w-6' />
                </a>
            </td>
        </tr>
    );
};

export default ProductListItem_Home;