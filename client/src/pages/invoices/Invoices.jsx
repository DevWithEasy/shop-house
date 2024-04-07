import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdInfo } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Delete_data from '../../components/Delete_data';
import Heading from '../../components/Heading';
import Search from '../../components/Search';
import useUserStore from '../../store/userStore';
import baseUrl from '../../utils/baseUrl';

const Invoices = () => {
    const { invoices, addInvoices } = useUserStore()
    const [remove, setRemove] = useState(false)
    const [query, setQuery] = useState('')
    const navigate = useNavigate()
    const getInvoices = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/invoice/`, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            addInvoices(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getInvoices()
    }, [])

    return (
        <div className='p-2'>
            <Heading>Invoices</Heading>
            <input
                type="search"
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                placeholder='Search by invoice id'
                className='mb-2 w-[350px] py-1 px-4 border border-gray-300 focus:outline-none placeholder:text-gray-300 placeholder:text-sm rounded-full'
            />
            <div className="relative overflow-x-auto space-y-3">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                Invoice Id
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Customer name
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Customer Number
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Subtotal
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Discount
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Total
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            invoices.filter(invoice => invoice._id.toLowerCase().includes(query) || invoice.customer.name.toLowerCase().includes(query) || invoice.customer.phone.toLowerCase().includes(query))
                                .map((invoice) => <tr
                                    key={invoice._id}
                                    className='bg-white cursor-pointer border-b'
                                >
                                    <td className="px-6 py-3 text-center">
                                        {invoice?._id}
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        {invoice?.customer?.name}
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        {invoice?.customer?.phone}
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        {invoice?.subTotal}
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        {invoice?.discount}
                                    </td>
                                    <td className="px-6 py-3 text-center">
                                        {invoice?.total}
                                    </td>
                                    <td className="px-6 py-3 text-center space-x-2">
                                        <button
                                            onClick={() => {
                                                navigate(`/invoice/${invoice._id}`)
                                            }}
                                            className='p-1.5 bg-green-400 text-white rounded-md'
                                        >
                                            <MdInfo />
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
                                            id: invoice._id,
                                            path: 'invoice',
                                            remove,
                                            setRemove
                                        }} />}
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

export default Invoices;