import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete } from 'react-icons/md';
import Delete_data from '../../components/Delete_data';
import Heading from '../../components/Heading';
import useUserStore from '../../store/userStore';
import baseUrl from '../../utils/baseUrl';

const Reports = () => {
    const { reports, addReports } = useUserStore()
    const [remove, setRemove] = useState(false)
    const [query, setQuery] = useState('')
    const getReports = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/report`, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (res.data.status === 200) {
                addReports(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getReports()
    }, [])
    return (
        <div
            className='p-4'
        >
            <Heading>All Reports</Heading>
            <input
                type="search"
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                placeholder='Search by id, month or year'
                className='mb-2 w-[350px] py-1 px-4 border border-gray-300 focus:outline-none placeholder:text-gray-300 placeholder:text-sm rounded-full'
            />
            <div className="relative overflow-x-auto space-y-3">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                Sl
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Id
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                From
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                To
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Year
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Month
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Purchase
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Sale
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {reports &&
                            reports.filter(report => report._id.toLowerCase().includes(query) || report.month.toLowerCase().includes(query) || report.month.toLowerCase().includes(query))
                            .map((report, i) => <tr
                                key={report._id}
                                className='bg-white border-b cursor-pointer'
                            >
                                <td className="px-6 py-3 text-center">
                                    {i + 1}
                                </td>
                                <td className="px-6 py-3 text-center">
                                    {report?._id}
                                </td>
                                <td className="px-6 py-3 text-center">
                                    {new Date(report?.from).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-3 text-center">
                                    {new Date(report?.to).toLocaleDateString()}
                                </td>
                                <td className="px-6 py-3 text-center">
                                    {report?.year}
                                </td>
                                <td className="px-6 py-3 text-center">
                                    {report?.month}
                                </td>
                                <td className="px-6 py-3 text-center">
                                    {report?.purchase}
                                </td>
                                <td className="px-6 py-3 text-center">
                                    {report?.sale}
                                </td>
                                <td className="px-6 py-3 text-center space-x-2">
                                    <button
                                        onClick={() => {
                                            setRemove(true)
                                        }}
                                        className='p-1.5 bg-red-500 text-white rounded-md'
                                    >
                                        <MdDelete />
                                    </button>
                                    {remove && <Delete_data {...{
                                        id: report._id,
                                        path: 'report',
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

export default Reports;