import React from 'react';
import Cart from '../components/Cart';
import Sidebar from '../components/Sidebar';

const Layout = ({children}) => {
    return (
        <div className='relative h-screen w-full flex justify-between'>
            <Sidebar/>
                <div className='h-screen w-10/12'>
                    <div className='bg-slate-50 h-full overflow-y-auto'>
                        {children}
                        <Cart/>
                    </div>
                </div>
        </div>
    );
};

export default Layout;