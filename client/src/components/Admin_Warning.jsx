import React from 'react';

const Admin_Warning = () => {
    
    return (
        <div
            className='fixed top-0 left-0 w-full h-screen flex justify-center items-center bg-gray-500/50 '
        >
            <div
                className='w-4/12 bg-white rounded shadow-md'
            >
                <h2 className='p-2 text-center text-xl text-red-500'>Warning</h2>
                <hr />
                <div
                    className='p-2 pb-5'
                >
                    <p>Hello, Dear Admin. </p>
                    <p>Dont try to this feature. Only see mode</p>
                </div>
                <hr/>
                <div
                    className='p-2 text-white space-x-2 flex justify-end'
                >
                    <button
                        className='px-4 py-2 bg-gray-500 rounded'
                    >
                        Close
                    </button>
                    <button
                        className='px-4 py-2 bg-blue-500 rounded'
                    >
                        Yes ! I understand.
                    </button>
                    
                </div>
            </div>
        </div>
    );
};

export default Admin_Warning;