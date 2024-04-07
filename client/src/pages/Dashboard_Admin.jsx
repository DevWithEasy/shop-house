import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { AiOutlineBarChart } from 'react-icons/ai';
import { BiCategoryAlt } from "react-icons/bi";
import { CiShop } from "react-icons/ci";
import { FaUsers } from "react-icons/fa6";
import { HiUsers } from "react-icons/hi2";
import { MdOutlineSell } from 'react-icons/md';
import { TbMoneybag } from 'react-icons/tb';
import Heading from '../components/Heading';
import Dashboard_skeleton from '../components/dashboard/Dashboard_skeleton';
import baseUrl from '../utils/baseUrl';
import Dashboard_Info from '../components/dashboard/Dashboard_Info';
import Report_admin_outlet from '../components/reports_chart/Report_admin_outlet';

const AdminDashboard = () => {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState({})
    const getDashboardData = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${baseUrl}/api/auth/dashboard/admin`, {
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

    const { employees, categories, customers, outlets, current_month, product, total } = data

    const infos = [
        {
            title: 'Total Employee',
            value: employees,
            color: 'pink',
            children: <FaUsers size={25} className='shrink-0 text-pink-500' />
        },
        {
            title: 'Total Customers',
            value: customers,
            color: 'green',
            children: <HiUsers size={25} className='shrink-0 text-green-500' />
        },
        {
            title: 'Total Category',
            value: categories,
            color: 'blue',
            children: <BiCategoryAlt size={25} className='shrink-0 text-blue-500' />
        },
        {
            title: 'Total Outlets',
            value: outlets && outlets.length,
            color: 'yellow',
            children: <CiShop size={25} className='shrink-0 text-yellow-500' />
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

    return (
        <>
            {loading ?
                <Dashboard_skeleton {...{ heading: 'Admin Dashboard' }} />
                :
                <div className='p-2'>
                    <Heading>Admin Dashboard</Heading>
                    <div
                        className='grid grid-cols-4 gap-4'
                    >
                        {
                            infos.map((info, i) =>
                                <Dashboard_Info
                                    key={i}
                                    {...{
                                        title: info.title,
                                        value: String(info.value).padStart(2,'0'),
                                        color: info.color,
                                    }}
                                >
                                    {info.children}
                                </Dashboard_Info>
                            )
                        }
                    </div>
                    {data.outlets &&
                        <Report_admin_outlet {...{
                            outlets : data.outlets
                        }}/>
                    }
                </div>
            }
        </>
    );
};

export default AdminDashboard;