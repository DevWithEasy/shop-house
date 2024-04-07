import React from 'react';
import { AiOutlineHome, AiOutlineEdit } from 'react-icons/ai';
import { BiCategoryAlt, BiPurchaseTag } from 'react-icons/bi';
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { MdAutoAwesomeMosaic } from 'react-icons/md';
import { PiBarcode, PiUsersBold, PiUsersDuotone } from 'react-icons/pi';
import { RiAddBoxLine, RiProductHuntLine } from 'react-icons/ri';
import { RxDashboard, } from 'react-icons/rx';
import { TbReportSearch } from 'react-icons/tb';
import { Link, NavLink } from 'react-router-dom';
import Heading from '../components/Heading';

const Admin_User = () => {
    const userData = [
        {
            title: 'Main',
            links: [
                {
                    path: '/admin/user',
                    title: 'Welcome',
                    icon: <MdAutoAwesomeMosaic size={16} />
                },
                {
                    path: '/',
                    title: 'Home',
                    icon: <AiOutlineHome size={16} />
                },
                {
                    path: '/admin/user/dashboard',
                    title: 'Dashboard',
                    icon: <RxDashboard size={16} />
                }
            ]
        },
        {
            title: 'Product',
            links: [
                {
                    path: '/admin/product/new',
                    title: 'Create Product',
                    icon: <RiAddBoxLine size={16} />
                },
                {
                    path: '/admin/products',
                    title: 'Products',
                    icon: <RiProductHuntLine size={16} />
                },
                {
                    path: '/admin/categories',
                    title: 'Categories',
                    icon: <BiCategoryAlt size={16} />
                },
                {
                    path: '/admin/printbarcode',
                    title: 'Print Barcode',
                    icon: <PiBarcode size={16} />
                },
            ]
        },
        {
            title: 'Purchases & sales',
            links: [
                {
                    path: '/admin/purchase/new',
                    title: 'Create Purchase',
                    icon: <RiAddBoxLine size={16} />
                },
                {
                    path: '/admin/purchases',
                    title: 'Purchases',
                    icon: <BiPurchaseTag size={16} />
                },
                {
                    path: '/admin/invoices',
                    title: 'Invoices',
                    icon: <LiaFileInvoiceSolid size={16} />
                },
            ]
        },
        {
            title: 'Report',
            links: [
                {
                    path: '/admin/report/new',
                    title: 'Create Report',
                    icon: <RiAddBoxLine size={16} />
                },
                {
                    path: '/admin/reports',
                    title: 'Reports',
                    icon: <TbReportSearch size={16} />
                }
            ]
        },
        {
            title: 'Customers',
            links: [
                {
                    path: '/admin/customer/new',
                    title: 'Add New Customer',
                    icon: <RiAddBoxLine size={16} />
                },
                {
                    path: '/admin/customers',
                    title: 'Customers',
                    icon: <PiUsersDuotone size={16} />
                }
            ]
        },
        {
            title: 'Users & Employees',
            links: [

                {
                    path: '/admin/users',
                    title: 'Users',
                    icon: <PiUsersBold size={16} />
                },
                {
                    path: '/admin/employee/new',
                    title: 'Add New Employee',
                    icon: <RiAddBoxLine size={16} />
                },
                {
                    path: '/admin/employees',
                    title: 'Employees',
                    icon: <PiUsersDuotone size={16} />
                },
            ]
        },
        {
            title: 'Attendance & Salary',
            links: [
                {
                    path: '/admin/take_attendance',
                    title: 'Take Attendance',
                    icon: <RiAddBoxLine size={16} />
                },
                {
                    path: '/admin/attendance/update',
                    title: 'Update Attendance',
                    icon: <AiOutlineEdit size={16} />
                },
                {
                    path: '/admin/monthly_attendance',
                    title: 'Monthly Attendance',
                    icon: <PiUsersBold size={16} />
                },
                {
                    path: '/admin/salary',
                    title: 'Salary',
                    icon: <RiAddBoxLine size={16} />
                }
            ]
        }
    ]
    return (
        <div
            className='p-2 space-y-2'
        >
            <Heading>Admin</Heading>
            <div
                className='grid grid-cols-3 gap-4'
            >
                {
                    userData.map((d, i) =>
                        <div
                            key={i}
                            className='bg-white border rounded'
                        >
                            <p className='p-2 bg-blue-50'>{d.title}</p>
                            <div
                                className=' p-2 text-sm'
                            >
                                {
                                    d.links.map((link, i) =>
                                        <Link
                                            key={i}
                                            to={link.path}
                                            className={`w-full p-2 flex items-center space-x-2 hover:bg-sky-50 hover:text-sky-500 hover:rounded-md transition-all duration-300 border-b`}
                                        >
                                            {link.icon}
                                            <span>{link.title}</span>
                                        </Link>
                                    )
                                }
                            </div>
                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default Admin_User;