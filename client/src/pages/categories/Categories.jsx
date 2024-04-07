import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { MdDelete, MdEditSquare } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';
import Delete_data from '../../components/Delete_data';
import Heading from '../../components/Heading';
import Search from '../../components/Search';
import useUserStore from '../../store/userStore';
import api_url from '../../utils/api_url';
import baseUrl from '../../utils/baseUrl';


const Categories = () => {
    const navigate = useNavigate()
    const {addCategoties,categories} = useUserStore()
    const [remove,setRemove] = useState(false)
    const [query,setQuery] = useState('')
    const getCategories = async() =>{
        try {
            const res = await axios.get(`${baseUrl}/api/category`)
            if(res.status === 200){
                addCategoties(res.data.data)
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=>{
        getCategories()
    },[])
    return (
        <div
            className='p-2'
        >
            <Heading>Categories</Heading>
            <input
                type="search"
                onChange={(e) => setQuery(e.target.value.toLowerCase())}
                placeholder='Search by name'
                className='mb-2 w-[350px] py-1 px-4 border border-gray-300 focus:outline-none placeholder:text-gray-300 placeholder:text-sm rounded-full'
            />
            <div className="relative overflow-x-auto space-y-3">
                <table className="w-full text-sm text-left text-gray-500">
                    <thead className="text-xs text-gray-700 uppercase bg-blue-50">
                        <tr>
                            <th scope="col" className="px-6 py-3 text-center">
                                Sl
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Category name
                            </th>
                            <th scope="col" className="px-6 py-3 text-center">
                                Action
                            </th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            categories && categories.filter(category=>category.name.toLowerCase().includes(query)).map((category,i)=><tr 
                                    key={category._id}
                                    className='bg-white cursor-pointer border-b'
                                >
                                <td className="px-6 py-3 text-center">{i+1}</td>
                                <td className="px-6 py-3 text-center">{category?.name}</td>
                                <td className="px-6 py-3 text-center space-x-2">
                                    <button 
                                        onClick={()=>{
                                            navigate(`/category/${category._id}`)
                                        }}
                                        className='p-1.5 bg-green-400 text-white rounded-md'
                                    >
                                        <MdEditSquare/>
                                    </button>
                                    <button 
                                        onClick={()=>{
                                            setRemove(true)
                                        }}
                                        className='p-1.5 bg-red-500 text-white rounded-md'
                                    >
                                        <MdDelete/>
                                    </button>
                                    {remove && <Delete_data {...{
                                        id : company._id, 
                                        path : 'category',
                                        remove, 
                                        setRemove
                                    }}/>}
                                </td>
                            </tr>)
                        }
                    </tbody>
                </table>
            </div>
        </div>
    );
};

export default Categories;