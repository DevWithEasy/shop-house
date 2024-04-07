import React from 'react';

const Dashboard_Info = ({children,title,color,value}) => {
    return (
        <div className='bg-white flex items-center rounded-md p-4 space-x-4 border'>
            <div
                className={`p-2 w-12 h-12 flex justify-center items-center bg-${color}-50 shrink-0 rounded-full`}
            >
                {children}
            </div>
            <div
                className='w-full'
            >
                <p 
                    className='text-gray-500'
                >
                    {title} : 
                </p>
                <p 
                    className={`text-2xl font-semibold text-${color}-500`}
                >
                    {value}
                </p>
            </div>
        </div>
    );
};

export default Dashboard_Info;