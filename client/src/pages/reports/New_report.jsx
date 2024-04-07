import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useState } from 'react';
import Heading from '../../components/Heading';
import baseUrl from '../../utils/baseUrl';
import handleChange from '../../utils/handleChange';
import toast_alert from '../../utils/toast_alert';
import dayDifference from '../../utils/dayDiiference';
import month from '../../utils/Month';

const New_report = () => {
    const toast = useToast()
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const [value, setValue] = useState({
        reportType: 'daily',
        start: month('','first'),
        end: month('','last')
    })
    const generateReport = async (e) => {
        e.preventDefault()
        const day = dayDifference(value.end, value.start)
        
        if(day === 0 || day === 27 || day === 28 || day === 29 || day === 30 ){
            setLoading(true)
            try {
            const res = await axios.post(`${baseUrl}/api/report`, value, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (res.data.status === 200) {
                setLoading(false)
                setData({
                    reportType : value.reportType,
                    from: value.start,
                    to: value.end,
                    year: new Date(value.start).getFullYear(),
                    month: month('','name'),
                    purchase: res.data?.data?.purchase?.value,
                    sale: res.data?.data?.invoice?.value
                })
            }

        } catch (error) {
            setLoading(false)
            console.log(error)
        }
        }else{
            return toast_alert(
                toast,
                'Plase selcet Two date between one day or Full month',
                'error'
            )
        }
        
    }

    const createReport = async () => {
        try {
            const res = await axios.post(`${baseUrl}/api/report/create`, data, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            console.log(res.data.data)
            if (res.data.status === 200) {
                setData({})
                toast_alert(
                    toast,
                    res.data.message
                )
            }

        } catch (error) {
            console.log(error)
            toast_alert(
                toast,
                'Report created failed.',
                'error'
            )
        }
    }

    

    return (
        <div
            className='p-4'
        >
            <Heading>Report Generate</Heading>
            <div
                className='flex justify-between gap-x-4'
            >
                <div
                    className='w-4/12 bg-white border rounded'
                >
                    <p
                        className='p-2 text-lg font-medium border-b'
                    >
                        Report By
                    </p>
                    <form
                        onSubmit={(e) => generateReport(e)}
                        className='p-4 space-y-2'
                    >
                        <div
                            className='space-y-2'
                        >
                            <label
                                className='block'
                            >Report type :</label>
                            <select
                                name='reportType'
                                value={value?.reportType}
                                onChange={(e) => handleChange(e, value, setValue)}
                                className='w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:border-sky-500'
                            >
                                <option value='daily'>Daily</option>
                                <option value='Monthly'>Monthly</option>
                            </select>
                        </div>
                        <div
                            className='space-y-2'
                        >
                            <label
                                className='block'
                            >Start Date :</label>
                            <input
                                type='date'
                                name='start'
                                value={value?.start}
                                onChange={(e) => handleChange(e, value, setValue)}
                                className='w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:border-sky-500'
                            />
                        </div>
                        <div
                            className='space-y-2'
                        >
                            <label
                                className='block'
                            >End Date :</label>
                            <input
                                type='date'
                                name='end'
                                value={value?.end}
                                onChange={(e) => handleChange(e, value, setValue)}
                                className='w-full p-2 border rounded-md border-gray-300 focus:outline-none focus:border-sky-500'
                            />
                        </div>
                        <button
                            type='submit'
                            className='w-full py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600'
                        >
                            {loading ? 'Generating...' : 'Generate Report'}
                        </button>
                    </form>
                </div>


                <div
                    className='w-8/12 bg-white border rounded'
                >
                    <p
                        className='p-2 text-lg font-medium border-b'
                    >
                        Report Summery {data?.reportType && (data?.reportType)}
                    </p>

                    {!data.from ?
                        <p className='text-center text-sm text-gray-500 animate-pulse p-10'>
                            Report will be generate between two date...
                        </p>
                        :
                        <div className="relative overflow-x-auto p-4 space-y-2 rounded-md">
                            <table className="w-full text-left text-gray-500 border">
                                <tbody>
                                    <tr
                                        className='border-b'
                                    >
                                        <td className='p-2 border-r'>From</td>
                                        <td className='p-2 text-right'>{data?.from}</td>
                                    </tr>
                                    <tr
                                        className='border-b'
                                    >
                                        <td className='p-2 border-r'>To</td>
                                        <td className='p-2 text-right'>{data?.to}</td>
                                    </tr>
                                    <tr
                                        className='border-b'
                                    >
                                        <td className='p-2 border-r'>Year</td>
                                        <td className='p-2 text-right'>{data?.year}</td>
                                    </tr>
                                    <tr
                                        className='border-b'
                                    >
                                        <td className='p-2 border-r'>Month</td>
                                        <td className='p-2 text-right'>{data?.month}</td>
                                    </tr>
                                    <tr
                                        className='border-b'
                                    >
                                        <td className='p-2 border-r'>Purchase</td>
                                        <td className='p-2 text-right'>{data?.purchase}</td>
                                    </tr>
                                    <tr
                                        className='border-b'
                                    >
                                        <td className='p-2 border-r'>Invoice</td>
                                        <td className='p-2 text-right'>{data?.sale}</td>
                                    </tr>
                                </tbody>
                            </table>
                            {/* <button
                                type='submit'
                                onClick={() => createReport()}
                                className='w-full px-6 py-2 bg-sky-500 text-white rounded-md hover:bg-sky-600'
                            >
                                Create Report
                            </button> */}
                        </div>
                    }
                </div>
            </div>

        </div>
    );
};

export default New_report;