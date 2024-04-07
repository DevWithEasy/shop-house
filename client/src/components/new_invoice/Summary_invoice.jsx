import React, { useState } from 'react';
import useProductStore from '../../store/productStore';

const Summary_invoice = () => {
    const { cart } = useProductStore()

    const [view,setView] = useState(false)

    const buyTotal = Math.ceil(cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0))
    const saleTotal = Math.ceil(cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0))

    const handleCreateInvoice = async (e) => {
        e.preventDefault()
        if (!order.name || !order.phone || phone < 11) {
            return toast_alert(
                toast,
                'Please field is blank.',
                'error'
            )
        }
        try {
            const res = await axios.post(`${baseUrl}/api/invoice/create`, order, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (res.data.success) {
                resetCart()
                setView(!view)
                toast_alert(
                    toast,
                    'Invoice created successfully'
                )
            }
        } catch (error) {
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
                <button
                    onClick={()=>setView(!view)}
                    className='w-full py-2 bg-sky-500 text-white rounded-md'
                >
                    Confirm
                </button>
                </div>
            </div>
        </div>
    );
};

export default Summary_invoice;