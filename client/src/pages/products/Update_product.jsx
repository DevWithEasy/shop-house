import { useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import Heading from '../../components/Heading';
import Loading from '../../components/Loading';
import useUserStore from '../../store/userStore';
import baseUrl from '../../utils/baseUrl';
import handleChange from '../../utils/handleChange';
import toast_alert from '../../utils/toast_alert';

const Update_product = () => {
    const { products } = useUserStore();
    const { id } = useParams()
    const navigate = useNavigate()
    const toast = useToast()
    const [value, setValue] = useState(products.find(p => p._id === id))
    const [categories, setCategories] = useState([])
    const [loading, setLoading] = useState(false)
    const [updating, setUpdating] = useState(false)

    const getData = async () => {
        setLoading(true)
        try {
            const res = await axios.get(`${baseUrl}/api/category/`)
            if (res.data.status === 200) {
                setCategories(res.data.data)
                setLoading(false)
            }
        } catch (error) {
            setLoading(false)
            toast_alert(
                toast,
                error?.response?.data?.message,
                'error'
            )
            console.log(error)
        }
    }

    const updateProduct = async (e) => {
        e.preventDefault()
        setUpdating(true)
        try {
            const res = await axios.put(`${baseUrl}/api/product/update/${value._id}`, value, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (res.data.status === 200) {
                setUpdating(false)
                toast_alert(
                    toast,
                    res.data.message
                )
                navigate('/products')
            }
        } catch (error) {
            setUpdating(false)
            toast_alert(
                toast,
                error?.response?.data?.message
            )
            console.log(error)
        }
    }

    useEffect(() => {
        getData()
    }, [])

    return (
        <div className='p-2'>
            <Heading>Update Product</Heading>
            <form
                onSubmit={(e) => updateProduct(e)}
                className="w-1/2 mx-auto p-4 space-y-2 bg-white rounded shadow"
            >
                <h1 className='text-center text-xl'>Update Product</h1>
                <div className='w-full space-y-2'>
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
                <div className='w-full space-y-2'>
                    <label htmlFor="">Category :</label>
                    <select
                        name='category'
                        value={value.category}
                        onChange={(e) => handleChange(e, value, setValue)}
                        className='w-full p-2 rounded-md border border-gray-300 focus:outline-sky-500'
                    >
                        {
                            categories.map((category) => <option key={category._id} value={category._id}>{category.name}</option>)
                        }
                    </select>
                </div>
                <button
                    className='px-6 py-2 bg-sky-500 text-white rounded'
                >
                    {
                        updating ? 'Updating...' : 'Submit'
                    }
                </button>
            </form>

        </div>
    );
};

export default Update_product;