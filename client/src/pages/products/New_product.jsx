import {
    useToast
} from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Heading from '../../components/Heading';
import Loading_request from '../../components/Loding_request';
import baseUrl from '../../utils/baseUrl';
import handleChange from '../../utils/handleChange';
import toast_alert from '../../utils/toast_alert';
import useUserStore from '../../store/userStore';
import Admin_Warning from '../../components/Admin_Warning';

const New_product = () => {
    const { user } = useUserStore()
    const toast = useToast()
    const navigate = useNavigate()
    const [loading, setLoading] = useState(false)
    const [categories, setCategories] = useState([])
    const [value, setValue] = useState({
        name: '',
        brand: '',
        model : '',
        size : '',
        price: '',
        quantity: 0,
    })

    const createProduct = async (e) => {
        e.preventDefault()
        if (!value.name || !value.brand || !value.model || !value.size) {
            return toast_alert(
                toast,
                'Please required all field.',
                'error'
            )
        }
        try {
            setLoading(true)
            const res = await axios.post(`${baseUrl}/api/product/create`, value, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (res.data.status === 200) {
                setLoading(false)
                toast_alert(
                    toast,
                    res.data.message
                )
                navigate('/admin/products')
            }

        } catch (error) {
            setLoading(false)
            toast_alert(
                toast,
                error?.response?.data?.message,
                'error'
            )
        }
    }

    const getData = async () => {
        try {
            const res = await axios.get(`${baseUrl}/api/brand/`)
            setCategories(res.data.data)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    console.log(user)

    return (
        <div className='p-2'>
            <Heading> Create new product </Heading>
            <form
                onSubmit={(e) => createProduct(e)}
                className='w-1/2 mx-auto space-y-3 p-4 bg-white rounded shadow'
            >
                <div className='space-y-2'>
                    <div className='space-y-2'>
                        <label htmlFor="">Name :</label>
                        <input
                            type='text'
                            name='name'
                            value={value.name}
                            onChange={(e) => handleChange(e, value, setValue)}
                            className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                        />
                    </div>
                    <div className='w-full space-y-2'>
                        <label htmlFor="">Price :</label>
                        <input
                            type='text'
                            name='price'
                            value={value.price}
                            onChange={(e) => handleChange(e, value, setValue)}
                            className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                        />
                    </div>
                    <div className='w-full space-y-2'>
                        <label htmlFor="">Brand :</label>
                        <select
                            name='brand'
                            value={value.brand}
                            onChange={(e) => handleChange(e, value, setValue)}
                            className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                        >
                            <option value="">select Brand</option>
                            {
                                categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)
                            }
                        </select>
                    </div>
                    <div className='w-full space-y-2'>
                        <label htmlFor="">Model :</label>
                        <input
                            type='text'
                            name='model'
                            value={value.model}
                            onChange={(e) => handleChange(e, value, setValue)}
                            className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                        />
                    </div>
                    <div className='w-full space-y-2'>
                        <label htmlFor="">Size :</label>
                        <input
                            type='text'
                            name='size'
                            value={value.size}
                            onChange={(e) => handleChange(e, value, setValue)}
                            className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                        />
                    </div>
                    <div className='w-full space-y-2'>
                        <label htmlFor="">Quntity :</label>
                        <input
                            type='text'
                            name='quantity'
                            value={value.quantity}
                            onChange={(e) => handleChange(e, value, setValue)}
                            className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                            disabled
                        />
                    </div>
                </div>

                <button
                    type='submit'
                    className='px-6 py-2 bg-sky-500 text-white rounded'
                >
                    Submit
                </button>
                <Loading_request {...{ loading, setLoading }} />
            </form>
            {!user?.isAdmin && <Admin_Warning />}
        </div>
    );
};

export default New_product;