import React from 'react';
import SidebarAdmin from '../components/SidebarAdmin';

const LayoutAdmin = ({ children }) => {
    return (
        <div className='relative h-screen w-full flex justify-between'>
            <SidebarAdmin/>
            <div className='h-screen w-10/12'>
                <div className='bg-slate-50 h-full overflow-y-auto'>
                    {children}
                </div>
            </div>
        </div>
    );
};

export default LayoutAdmin;