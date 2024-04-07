import React from 'react';
import img from '../assets/user.png';
import useUserStore from '../store/userStore';

const Header = () => {
    const { user } = useUserStore()
    return (
        <div className='w-[200px]'>
            <div className='px-4 py-2 flex justify-between items-center space-x-2 bg-sky-500 text-white rounded-md'>
                <img
                    src={img}
                    alt='user'
                    className='w-8 h-8 my-auto rounded-full'
                />
                <div
                    className='w-full'
                >
                    <p className='text-sm'>{user?.name}</p>
                    <p className='text-xs'>{user?.email}</p>
                </div>
            </div>

        </div>
    );
};

export default Header;