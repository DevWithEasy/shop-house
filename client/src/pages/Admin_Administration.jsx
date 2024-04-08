import React from 'react';
import { AiOutlineEdit, AiOutlineHome } from 'react-icons/ai';
import { BiCategoryAlt, BiPurchaseTag } from 'react-icons/bi';
import { FaRegAddressBook } from "react-icons/fa";
import { LiaFileInvoiceSolid } from 'react-icons/lia';
import { MdAutoAwesomeMosaic } from 'react-icons/md';
import { PiBarcode, PiUsersBold, PiUsersDuotone } from 'react-icons/pi';
import { RiAddBoxLine, RiProductHuntLine } from 'react-icons/ri';
import { RxDashboard, } from 'react-icons/rx';
import { TbReportSearch } from 'react-icons/tb';
import { Link, NavLink } from 'react-router-dom';
import Heading from '../components/Heading';

const Admin_Administration = () => {
    const data = [
        {
            title: 'Main',
            links: [
                {
                    path: '/admin/administration',
                    title: 'Welcome',
                    icon: <MdAutoAwesomeMosaic size={16} />
                },
                {
                    path: '/',
                    title: 'Home',
                    icon: <AiOutlineHome size={16} />
                },
                {
                    path: '/admin/dashboard',
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
                    path: '/admin/brand/new',
                    title: 'Create Brand',
                    icon: <RiAddBoxLine size={16} />
                },
                {
                    path: '/admin/brands',
                    title: 'Brands',
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
            title: 'Users & Employee',
            links: [
                {
                    path: '/admin/user/new',
                    title: 'Add New User',
                    icon: <RiAddBoxLine size={16} />
                },
                {
                    path: '/admin/users',
                    title: 'Users',
                    icon: <PiUsersBold size={16} />
                }
            ]
        }
    ]
    return (
        <div
            className='p-2 space-y-2'
        >
            <Heading>Administration</Heading>
            <div
                className='grid md:grid-cols-3 gap-4'
            >
                {
                    data.map((d, i) =>
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

export default Admin_Administration;