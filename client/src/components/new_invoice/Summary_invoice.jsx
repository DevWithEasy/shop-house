import React, { useState } from 'react';
import useProductStore from '../../store/productStore';
import Find_customer_invoice from './Find_customer_invoice';

const Summary_invoice = () => {
    const { cart } = useProductStore()

    const [percent, setPercent] = useState(0)

    const [view,setView] = useState(false)

    const subTotal = Math.ceil(cart.reduce((total, cartItem) => total + cartItem.price * cartItem.quantity, 0))

    const discount = Math.ceil(subTotal*percent/100,0)

    const total = subTotal - discount

    return (
        <div
            className='w-4/12 h-68 bg-white border'
        >
            <h1 className='px-2 py-1 bg-blue-50 font-semibold'>Invoice Total</h1>
            <div
                className='p-4 space-y-3'
            >
                <p
                    className='flex justify-between px-2 pb-2 text-sm border-b'
                >
                    <span className='font-semibold'>Subtotal</span>
                    <span>{subTotal} /-</span>
                </p>
                <div
                    className='flex justify-between px-2 pb-2 text-sm border-b'
                >
                    <p>
                        <span className='font-semibold'>
                            Discount
                            (
                            <input
                                type='number'
                                value={percent}
                                min={0}
                                onChange={(e) => setPercent(Number(e.target.value))}
                                className='w-4 text-center focus:outline-none'
                            />%
                            )
                        </span>
                    </p>
                    <span>{discount} /-</span>
                </div>
                <p
                    className='flex justify-between px-2 pb-2 text-xl'
                >
                    <span className='font-semibold'>Total</span>
                    <span>{total} /-</span>
                </p>
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
            {view &&
                <Find_customer_invoice {...{view,setView,setPercent,subTotal,discount,total}}/>
            }
        </div>
    );
};

export default Summary_invoice;