import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineBarChart } from 'react-icons/ai';
import { FaProductHunt } from "react-icons/fa";
import { BiCategoryAlt } from "react-icons/bi";
import { MdOutlineSell } from 'react-icons/md';
import { FaUsers } from "react-icons/fa6";
import { TbMoneybag } from 'react-icons/tb';
import Dashboard_skeleton from '../components/dashboard/Dashboard_skeleton';
import Heading from '../components/Heading';
import ReportChart from '../components/reports_chart/ReportChart';
import baseUrl from '../utils/baseUrl';
import get_fixed_num from '../utils/get_fixed_num';
import Dashboard_Info from '../components/dashboard/Dashboard_Info';

const UserDashboard = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const getDashboardData = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${baseUrl}/api/auth/dashboard`, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (res.data.status === 200) {
                setLoading(false)
                setData(res.data.data)
            }
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }

    const { employees, categories, current_month, product, total } = data

    const benifits = (product?.stock_value + total?.sale) - total?.purchase

    const benifits_percent = (benifits / total?.purchase
    ) * 100

    const infos = [
        {
            title: 'Total Employee',
            value: employees,
            color: 'pink',
            children: <FaUsers size={25} className='shrink-0 text-pink-500' />
        },
        {
            title: 'Total Category',
            value: categories,
            color: 'blue',
            children: <BiCategoryAlt size={25} className='shrink-0 text-blue-500' />
        },
        {
            title: 'Total Products',
            value: product?.total_products,
            color: 'yellow',
            children: <FaProductHunt size={25} className='shrink-0 text-yellow-500' />
        },
        {
            title: 'Total Purchase(Month)',
            value: current_month?.purchase,
            color: 'blue',
            children: <TbMoneybag size={25} className='shrink-0 text-blue-500' />
        },
        {
            title: 'Total sale(Month)',
            value: current_month?.sale,
            color: 'green',
            children: <MdOutlineSell size={25} className='shrink-0 text-green-500' />
        },
        {
            title: 'Total Stock',
            value: product?.stock_value,
            color: 'yellow',
            children: <AiOutlineBarChart size={25} className='shrink-0 text-yellow-500' />
        },
        {
            title: 'Total Purchases',
            value: total?.purchase,
            color: 'pink',
            children: <TbMoneybag size={25} className='shrink-0 text-pink-500' />
        },
        {
            title: 'Total Sales',
            value: total?.sale,
            color: 'red',
            children: <MdOutlineSell size={25} className='shrink-0 text-red-500' />
        },
    ]

    useEffect(() => {
        getDashboardData()
    }, [])
    console.log(data.reports)
    return (
        <>
            {loading ?
                <Dashboard_skeleton {...{ heading: 'Dashboard' }} />
                :
                <div className='p-4'>
                    <Heading>Dashborad</Heading>
                    <div className='w-full grid grid-cols-2 md:grid-cols-4 gap-3'>
                        {
                            infos.map((info,i) =>
                                <Dashboard_Info
                                    key={i}
                                    {...{
                                        title: info.title,
                                        value: info.value,
                                        color: info.color,
                                    }}
                                >
                                    {info.children}
                                </Dashboard_Info>
                            )
                        }
                    </div>
                    <div
                        className='w-full grid grid-cols-2 gap-3 mt-5'
                    >
                        {data.reports &&
                            <ReportChart
                                {...{
                                    reports: data.reports
                                }}
                            />
                        }
                        <div
                            className='w-full flex flex-col  items-center space-y-3 bg-white border rounded p-2'
                        >
                            <p
                                className='text-center text-xl font-bold border-b-2'
                            >
                                Profit (%)
                            </p>
                            <div
                                className='h-40 w-40 flex justify-center items-center border-[10px] border-sky-500 rounded-full'
                            >
                                <span
                                    className='font-bold text-2xl text-sky-500'
                                >
                                    {
                                        benifits_percent ? get_fixed_num(benifits_percent) : 0
                                    }%
                                </span>
                            </div>
                            <p
                                className=''
                            >
                                This profit % generate by total purchase value,current stock value and total sale value.
                            </p>
                        </div>
                    </div>
                </div>
            }
        </>
    );
};

export default UserDashboard;