import axios from 'axios';
import React, { useEffect, useState } from 'react';
import useUserStore from '../../store/userStore';
import baseUrl from '../../utils/baseUrl';
import Heading from '../../components/Heading';

const PrintBarCode = () => {
    const { products, addProducts } = useUserStore()
    const [query, setQuery] = useState('')
    const getProducts = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/product/`)

            addProducts(res.data.data)

        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getProducts()
    }, [])
    return (
        <div className='p-2'>
            <Heading>Print Product QR Code</Heading>
            <input
                type="search"
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                placeholder='Search by product,generic or company name'
                className='mb-2 w-[350px] py-1 px-4 border border-gray-300 focus:outline-none placeholder:text-gray-300 placeholder:text-sm rounded-full'
            />

            <div className="relative overflow-x-auto space-y-3">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-2 py-3">
                                Name
                            </th>

                            <th scope="col" className="px-6 py-3 text-center">
                                Image
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            products.filter(product => product.name.toLowerCase().includes(query) || product.company.name.toLowerCase().includes(query) || product.generic.name.toLowerCase().includes(query))
                                .map(product =>
                                    <tr key={product._id} 
                                        className='bg-white border-b'
                                    >
                                        <td
                                            className='p-2'
                                        >
                                            {product?.name}
                                        </td>
                                        <td className='flex justify-center'>
                                            <a
                                                href={product?.barCode}
                                                download={product?.name}
                                            >
                                                <img src={product?.barCode} className='w-16' />
                                            </a>
                                        </td>
                                    </tr>
                                )
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default PrintBarCode;