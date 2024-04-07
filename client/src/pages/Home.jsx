import { AiOutlineHome } from 'react-icons/ai';
import { RiProductHuntLine } from 'react-icons/ri';
import { TbFileInvoice } from 'react-icons/tb';
import useUserStore from "../store/userStore";
import { NavLink } from 'react-router-dom';
import { RxDashboard } from 'react-icons/rx';
import { BiLogOutCircle } from 'react-icons/bi';

const Home = () => {
    const { user } = useUserStore()
    const data = [
        {
            path: '/',
            title: 'Home',
            icon: <AiOutlineHome size={16} />
        },
        {
            path: '/products/',
            title: 'Products',
            icon: <RiProductHuntLine size={16} />
        },
        {
            path: '/invoice/new',
            title: 'Create Invoices',
            icon: <TbFileInvoice size={16} />
        },
        {
            path: '/invoices/',
            title: 'Invoices',
            icon: <TbFileInvoice size={16} />
        }
    ]
    return (
        <div className='h-screen p-2 space-y-2'>
            <div
                className="space-y-2"
            >
                <h1 className='text-4xl font-bold text-center text-sky-500 uppercase'>Fantsy Shoe House</h1>
                <p className='text-center text-gray-500 italic'>Buy your all daily needs.</p>
                <hr />
            </div>
            <div
                className="bg-white border rounded text-sm"
            >
                <p
                    className="p-2 border-b"
                >
                    You logged as <b>{user.isAdmin ? 'Admin' : 'Outlet Owner'}</b>
                </p>
                <div
                    className="p-2"
                >
                    <table
                        className="w-full"
                    >
                        <tbody>
                            <tr>
                                <td>Name</td>
                                <td>:</td>
                                <td> {user?.name}</td>
                            </tr>
                            <tr>
                                <td>Phone</td>
                                <td>:</td>
                                <td> {user?.phone}</td>
                            </tr>
                            <tr>
                                <td>Address</td>
                                <td>:</td>
                                <td> {user?.address}</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
            <div className='w-full flex flex-col items-center justify-center space-y-2 mt-5'>
                {
                    data.map((d, i) => <NavLink
                        key={i}
                        to={d?.path}
                        className='p-2 w-full flex items-center sm:justify-start space-x-2 bg-white rounded-md overflow-hidden'
                    >
                        <span className='shrink-0'>{d?.icon}</span>
                        <span >{d?.title}</span>
                    </NavLink>
                    )
                }

                {user.isAdmin ?
                    <NavLink
                        to='/admin/administration'
                        className='p-2 w-full flex items-center sm:justify-start space-x-2 bg-white rounded-md overflow-hidden'
                    >
                        <span className='shrink-0'>
                            <RxDashboard size={16} />
                        </span>
                        <span>Admin</span>
                    </NavLink>
                    :
                    <NavLink
                        to='/admin/user'
                        className='p-2 w-full flex items-center sm:justify-start space-x-2 bg-white rounded-md overflow-hidden'
                    >
                        <span className='shrink-0'>
                            <RxDashboard size={16} />
                        </span>
                        <span >Admin</span>
                    </NavLink>
                }

                <button
                    onClick={() => logout()}
                    className='p-2 w-full flex items-center sm:justify-start space-x-2 bg-white rounded-md overflow-hidden hover:bg-red-500 hover:text-white transition-all duration-500'
                >
                    <span className='shrink-0'>
                        <BiLogOutCircle size={16} />
                    </span>
                    <span >Logout</span>
                </button>
            </div>
        </div>
    );
};

export default Home;