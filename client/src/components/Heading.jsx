import React from 'react';
import { BsArrowLeft } from 'react-icons/bs';
import { useNavigate } from 'react-router-dom';
import Header from '../components/Header'
import useUserStore from '../store/userStore';

const Heading = ({children}) => {
    const navigate = useNavigate()
    const {user} = useUserStore()
    
    return (
        <div className='relative flex justify-between items-center border-b pb-2 mb-2'>
            <div
                className='flex items-center'
            >
            <BsArrowLeft 
                size={20}
                onClick={()=>{
                    navigate(-1)
                }}
                className='cursor-pointer text-red-500'
            />
            <span className='text-center text-xl p-2 uppercase'>{children}</span>
            </div>
            <Header/>
        </div>
    );
};

export default Heading;