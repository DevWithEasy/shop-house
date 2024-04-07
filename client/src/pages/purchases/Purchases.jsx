import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEditSquare, MdInfo, MdInfoOutline } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Delete_data from '../../components/Delete_data';
import Heading from '../../components/Heading';
import useUserStore from '../../store/userStore';
import baseUrl from '../../utils/baseUrl';

const Purchases = () => {
    const navigate = useNavigate()
    const { addPurchases, purchases } = useUserStore()
    const [remove, setRemove] = useState(false)
    const [query, setQuery] = useState('')

    const getPurchases = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/purchase`,{
                headers : {
                    authorization : localStorage.getItem('token')
                }
            })
            if (res.status === 200) {
                addPurchases(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getPurchases()
    }, [])
    return (
        <div
            className='p-2'
        >
            <Heading>Purchase History</Heading>
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
                            <th scope="col" className="px-6 py-3 text-left">
                                ID
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Purchase by
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Total Value
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            purchases.filter(purchase => purchase._id.toLowerCase().includes(query) || purchase._id.toLowerCase().includes(query))
                                .map((purchase) => <tr
                                    key={purchase._id}
                                    className='bg-white border-b cursor-pointer'
                                >
                                    <td className="px-6 py-3 text-left">{purchase?._id}</td>
                                    <td className="px-6 py-3 text-center">{purchase?.user?.name}</td>
                                    <td className="px-6 py-3 text-center">{purchase?.total}</td>
                                    <td className="px-6 py-3 text-center space-x-2">
                                        <button
                                            onClick={() => {
                                                navigate(`/admin/purchase/${purchase._id}`)
                                            }}
                                            className='p-1.5 bg-blue-400 text-white rounded-md'
                                        >
                                            <MdInfoOutline />
                                        </button>
                                        <button
                                            onClick={() => {
                                                navigate(`/admin/purchase/update/${purchase._id}`)
                                            }}
                                            className='p-1.5 bg-green-400 text-white rounded-md'
                                        >
                                            <MdEditSquare />
                                        </button>
                                        <button
                                            onClick={() => {
                                                setRemove(true)
                                            }}
                                            className='p-1.5 bg-red-500 text-white rounded-md'
                                        >
                                            <MdDelete />
                                        </button>
                                        {remove && <Delete_data {...{
                                            id: purchase._id,
                                            path: 'purchase',
                                            remove,
                                            setRemove
                                        }} />}
                                    </td>
                                </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Purchases;