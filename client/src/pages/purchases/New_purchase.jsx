import { useDisclosure, useToast } from '@chakra-ui/react';
import axios from 'axios';
import React, { useRef, useState } from 'react';
import { RxCross2 } from 'react-icons/rx';
import Heading from '../../components/Heading';
import Loading_request from '../../components/Loding_request';
import baseUrl from '../../utils/baseUrl';
import handleChange from '../../utils/handleChange';
import toast_alert from '../../utils/toast_alert';
import Product_Select_invoice from '../../components/new_invoice/Product_Select_invoice';
import handleFocus from '../../utils/handleFocus';

const New_purchase = () => {
    const toast = useToast()
    const { onClose } = useDisclosure()
    const [loading, setLoading] = useState(false)
    const [search, setSearch] = useState('')
    const [check, setCheck] = useState()
    const [find, setFind] = useState([])
    const [products, setProducts] = useState([])
    const [_id, set_id] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [totalPrice, setTotalPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [isSelect, setIsSelect] = useState(false)


    const [calculate, setCalculate] = useState({
        quantity: '',
        price: '',
    })

    const searchRef = useRef(null)
    const selectRef = useRef(null)

    const handleCheck = (e) => {
        if (e.target.checked) {
            setCheck(true)
        } else {
            setCheck(false)
        }
    }

    const handleSearch = async (query) => {
        setSearch(query)
        if (query.length < 3) return

        try {
            const res = await axios.get(`${baseUrl}/api/product/search?q=${search}`,{
                headers : {
                    authorization : localStorage.getItem('token')
                }
            })

            if (res.data.success) {
                setFind(res.data.data)
                setIsSelect(!isSelect)
            }

            setTimeout(()=>{
                if (selectRef.current) {
                    selectRef.current.focus();
                }
            },200)
            
        } catch (error) {
            console.log(error)
        }

    }

    const setProduct = (selectedOption) => {

        const findProduct = find.find(product => product._id === selectedOption.value)

        set_id(findProduct._id)
        setName(findProduct.name)
        setPrice(findProduct.price)
        setIsSelect(!isSelect)
        handleFocus('#quantity')
    }

    const handleKeyDown = (e) => {
        if (e.key === 'ArrowDown') {
            handleFocus('#totalPrice')
        }
        if (e.key === 'ArrowUp') {
            handleFocus('#quantity')
        }
    }

    const cancel = () => {
        set_id('')
        setName('')
        setPrice('')
        setTotalPrice('')
        setQuantity('')
        setCalculate({
            quantity: '',
            price: '',
        })
        setCheck(false)
    }

    const addProduct = (e) => {
        e.preventDefault()

        if (!quantity || !totalPrice) {
            return toast({
                title: 'Input quantity and price field empty.',
                status: 'error',
                isClosable: true,
            })
        }

        const find = products.find(product => product._id === _id)
        if (find) {
            return toast({
                title: 'already added this product.',
                status: 'error',
                isClosable: true,
            })
        } else {
            setProducts([
                ...products,
                {
                    _id,
                    name,
                    price,
                    totalPrice,
                    quantity
                }
            ])
            cancel()
            setSearch('')
            searchRef.current.focus()
        }
    }

    const removeProduct = (id) => {
        setProducts(products.filter(product => product._id !== id))
    }

    const calculation = () => {
        const price = Number((Number(calculate.quantity) / Number(calculate.price)).toFixed(2))
        setPrice(price)
    }

    const total = products.reduce((total, product) => total + Number(product.totalPrice), 0)

    const createPurchase = async () => {
        try {
            setLoading(true)
            const res = await axios.post(`${baseUrl}/api/purchase/create`, { total, products }, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (res.status === 200) {
                setProducts([])
                setLoading(false)
                onClose()
                toast_alert(
                    toast,
                    res.data.message
                )
            }

        } catch (error) {
            console.log(error)
            setLoading(false)
            toast_alert(
                toast,
                error.response.data.message,
                'error'
            )
        }
    }

    return (
        <div className='p-2'>
            <Heading>Create new purchase</Heading>
            <div className='flex justify-between space-x-2'>
                <div className='w-4/12 h-68 bg-white p-2 rounded-md'>
                    <div
                        className=''
                    >
                        <p className='bg-blue-50 p-2 text-xs text-center font-semibold uppercase mb-2'>
                            Search product and insert data
                        </p>
                        <input
                            id='search'
                            type='search'
                            ref={searchRef}
                            value={search}
                            onChange={(e) => handleSearch(e.target.value)}
                            autoFocus
                            className='w-full p-2 mb-2 border rounded-md focus:outline-none focus:ring-2 ring-sky-500 placeholder:text-sm'
                            placeholder='find by product name'
                        />

                        {find.length > 0 && isSelect &&
                            <Product_Select_invoice {...{
                                find,
                                selectRef,
                                setProduct
                            }} />
                        }

                    </div>
                    <form
                        onSubmit={(e) => addProduct(e)}
                        className='space-y-2'
                    >

                        <div
                            className='space-y-2'
                        >
                            <input
                                name='name'
                                value={name}
                                className='w-full p-2 border rounded-md focus:outline-sky-500 placeholder:text-sm'
                                disabled
                            />

                            <input
                                name=''
                                value={price}
                                className='w-full p-2 border rounded-md focus:outline-sky-500 placeholder:text-sm'
                                disabled
                            />
                            <input
                                id='quantity'
                                value={quantity}
                                onChange={(e) => setQuantity(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className='w-full p-2 border rounded-md focus:outline-sky-500 placeholder:text-sm'
                                placeholder='enter total quantity of product'
                            />
                            <input
                                id='totalPrice'
                                value={totalPrice}
                                onChange={(e) => setTotalPrice(e.target.value)}
                                onKeyDown={handleKeyDown}
                                className='w-full p-2 border rounded-md focus:outline-sky-500 placeholder:text-sm'
                                placeholder='enter total price of product'
                            />
                        </div>

                        <div
                            className='space-x-2'
                        >
                            <button
                                type='submit'
                                className='px-4 py-2 bg-sky-500 text-white rounded-md'
                            >
                                Add list
                            </button>
                            <button
                                onClick={() => cancel()}
                                className='px-4 py-2 bg-gray-500 text-white rounded-md'
                            >
                                Cancel
                            </button>

                        </div>
                        <div
                            className='flex items-center space-x-1'
                        >
                            <input
                                id='calculate'
                                type='checkbox'
                                onChange={(e) => handleCheck(e)}
                            />
                            <label
                                htmlFor='calculate'
                                className='text-sm'
                            >
                                Calculate price (If want update product price)
                            </label>
                        </div>

                        {check && <div
                            className='border space-y-2 rounded-md p-2'
                        >
                            <div
                                className='flex space-x-2'
                            >
                                <input
                                    name='quantity'
                                    onChange={(e) => handleChange(e, calculate, setCalculate)}
                                    className='w-1/2 p-2 border rounded-md focus:outline-sky-500 placeholder:text-sm'
                                    placeholder='enter total quantity'
                                />
                                <input
                                    name='price'
                                    onChange={(e) => handleChange(e, calculate, setCalculate)}
                                    className='w-1/2 p-2 border rounded-md focus:outline-sky-500 placeholder:text-sm'
                                    placeholder='enter total price'
                                />
                            </div>
                            <div
                                className='flex justify-center'
                            >
                                <button
                                    onClick={() => calculation()}
                                    className='p-2 bg-sky-500 text-white rounded-md'
                                >
                                    Calculate
                                </button>
                            </div>
                        </div>}
                    </form>
                    {products.length > 0 &&
                        <div
                            className='mt-5 mb-2 flex justify-center'
                        >
                            <button
                                onClick={() => createPurchase()}
                                className='w-full p-2 bg-sky-500 text-white rounded-md'
                            >
                                Create Purchese
                            </button>
                            <Loading_request {...{ loading, setLoading }} />
                        </div>
                    }
                </div>
                <div className='w-8/12 space-y-2 bg-white p-2 rounded-md'>
                    <div className="relative overflow-x-auto space-y-3">
                        <table className="w-full text-sm text-left text-gray-500">
                            <thead className="text-xs text-gray-700 uppercase bg-blue-50">
                                <tr>
                                    <th scope="col" className="px-2 py-2 text-center">
                                        Sl
                                    </th>
                                    <th scope="col" className="px-6 py-2 text-center">
                                        Name
                                    </th>
                                    <th scope="col" className="p-2 text-center">
                                        Price
                                    </th>
                                    <th scope="col" className="px-6 py-2 text-center">
                                        Quantity
                                    </th>
                                    <th scope="col" className="px-6 py-2 text-center">
                                        Total Price
                                    </th>
                                    <th scope="col" className="p-2 text-center">
                                        Action
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {
                                    products.map((product, i) => <tr
                                        key={product._id}
                                        className='bg-white border-b'
                                    >
                                        <td className='p-2 text-center'>{i + 1}</td>
                                        <td className='px-6 py-2 text-center'>{product?.name}</td>
                                        <td className='p-2 text-center'>{product?.price}</td>
                                        <td className='px-6 py-2 text-center'>{product?.quantity}</td>
                                        <td className='px-6 py-2 text-center'>{product?.totalPrice}</td>
                                        <td className='p-2 text-center flex justify-center  text-red-500'>
                                            <RxCross2
                                                onClick={() => removeProduct(product._id)}
                                                size={20}
                                                className='cursor-pointer'
                                            />
                                        </td>
                                    </tr>)
                                }
                            </tbody>
                        </table>
                    </div>
                    
                </div>

            </div>
        </div>
    );
};

export default New_purchase;