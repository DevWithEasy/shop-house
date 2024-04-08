import React, { useState } from 'react';
import useProductStore from '../../store/productStore';
import baseUrl from '../../utils/baseUrl';
import toast_alert from '../../utils/toast_alert';
import Loading_request from '../Loding_request';
import { useToast } from '@chakra-ui/react';
import axios from 'axios'

const Summary_invoice = () => {
    const toast = useToast()
    const { cart,resetCart } = useProductStore()
    const [view, setView] = useState(false)
    const [loading,setLoading] = useState(false)

    const buyTotal = Math.ceil(cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0))
    const saleTotal = Math.ceil(cart.reduce((total, cartItem) => total + cartItem.salePrice * cartItem.quantity, 0))

    const handleCreateInvoice = async (e) => {
        setLoading(true)
        try {
            const res = await axios.post(`${baseUrl}/api/invoice/create`,
                {
                    buy: buyTotal,
                    sale: saleTotal,
                    products: cart.map(p => {
                        return {
                            product: p._id,
                            quantity: p.quantity,
                            buyPrice: p.price,
                            salePrice: p.salePrice
                        }
                    })
                },
                {
                    headers: {
                        authorization: localStorage.getItem('token')
                    }
                })
            if (res.data.success) {
                setLoading(false)
                resetCart()
                setView(!view)
                toast_alert(
                    toast,
                    'Invoice created successfully'
                )
            }
        } catch (error) {
            console.log(error)
            setLoading(false)
            toast_alert(
                toast,
                'Invoice created failed.',
                'error'
            )
        }
    }

    return (
        <div
            className='md:w-4/12 h-68 bg-white border'
        >
            <h1 className='px-2 py-1 bg-blue-50 font-semibold'>Invoice Total</h1>
            <div
                className='p-4 space-y-3'
            >
                <p
                    className='flex justify-between px-2 pb-2 text-sm border-b'
                >
                    <span className='md:font-semibold'>Buy Price</span>
                    <span>{buyTotal} /-</span>
                </p>
                <div
                    className='flex justify-between px-2 pb-2 text-sm border-b'
                >
                    <span className='md:font-semibold'>Sale Price</span>
                    <span>{saleTotal} /-</span>
                </div>
                <div
                    className='pt-4 space-y-2'
                >
                    {cart.length > 0 &&
                        <button
                            onClick={handleCreateInvoice}
                            className='w-full py-2 bg-sky-500 text-white rounded-md'
                        >
                            Confirm
                        </button>
                    }
                </div>
            </div>
            {loading && <Loading_request {...{loading}}/>}
        </div>
    );
};

export default Summary_invoice;