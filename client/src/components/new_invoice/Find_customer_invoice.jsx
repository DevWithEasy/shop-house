import { useState } from "react"
import toast_alert from "../../utils/toast_alert"
import { useToast } from "@chakra-ui/react"
import baseUrl from "../../utils/baseUrl"
import axios from "axios"
import { CiKeyboard } from 'react-icons/ci'
import useProductStore from "../../store/productStore"
export default function Find_customer_invoice({ view, setView, setPercent,subTotal,discount,total }) {

    const toast = useToast()

    const {cart,resetCart} = useProductStore()

    const [formView, setFormView] = useState(false)

    const [name, setName] = useState('')

    const [phone, setPhone] = useState('')

    const [customer, setCustomer] = useState({})

    const [customerView, setCustomerView] = useState(false)

    const order = {
        name : name || customer.name,
        phone : phone || customer.phone,
        total,discount,subTotal,cart
    }

    const handleKeyDown = (e) => {
        if (e.key === 'F2') {
            setFormView(!formView)
            setPhone('')
            setCustomerView(!customerView)
        }
        if (e.key === 'ArrowDown') {
            document.querySelector('#phone').focus()
        }
    }

    const handleCancel = (e) => {
        if (e.target.id === 'wrapper') {
            setView(!view)
            setCustomer({})
        }
    }

    const handleFindCustomer = async (e) => {
        e.preventDefault()

        if (phone.length < 11) {
            return toast_alert(
                toast,
                'Please insert 11 number',
                'error'
            )
        }

        try {
            const res = await axios.get(`${baseUrl}/api/customer/${phone}`, {
                headers: {
                    authorization: localStorage.getItem('token')
                }
            })
            if (!res.data.data) {
                toast_alert(
                    toast,
                    'Not found customer',
                    'error'
                )
                setFormView(!formView)
            } else {
                setCustomerView(!customerView)
                setCustomer(res.data.data)
                setPercent(res.data.data.status === 'Premium' ? 3 : 0)
                toast_alert(
                    toast,
                    'Customer successfully find.'
                )
            }

        } catch (error) {
            console.log(error)
        }
    }

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
            id='wrapper'
            onClick={(e) => handleCancel(e)}
            className='absolute left-0 top-0 w-full h-screen bg-slate-400/50'
        >

            <div
                className="w-4/12 mx-auto mt-24 bg-white shadow-xl rounded-lg"
            >
                {formView ?
                    <form
                        onSubmit={(e) => handleCreateInvoice(e)}
                        className='p-4 space-y-3'
                    >
                        <h2 className="text-xl font-semibold">New customer</h2>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className='w-full p-2 rounded-md border focus:outline-sky-500'
                        />
                        <input
                            id="phone"
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onKeyDown={handleKeyDown}
                            className='w-full p-2 rounded-md border focus:outline-sky-500'
                        />
                        <div className='flex justify-end'>
                            <button
                                type='submit'
                                className='px-4 py-2 bg-sky-500 text-white rounded-md'
                            >
                                Submit
                            </button>
                        </div>
                    </form>
                    :
                    <form
                        onSubmit={(e) => handleFindCustomer(e)}
                        className='p-4 space-y-3'
                    >
                        <h2 className="text-xl font-semibold">Find customer</h2>
                        <input
                            value={phone}
                            onChange={(e) => setPhone(e.target.value)}
                            onKeyDown={handleKeyDown}
                            autoFocus
                            className='w-full p-2 rounded-md border focus:outline-sky-500'
                        />
                        <div className='flex justify-end'>
                            <button
                                type='submit'
                                className='px-4 py-2 bg-sky-500 text-white rounded-md'
                            >
                                Find Customer
                            </button>
                        </div>
                    </form>
                }
                {customerView && customer.name &&
                    <div
                        className="p-4"
                    >
                        <p className="py-1 text-center bg-gray-200 border">Customer</p>
                        <table
                            className="w-full border mb-2"
                        >
                            <tbody>
                                <tr>
                                    <td className="px-2 py-1">Name</td>
                                    <td>:</td>
                                    <td className="px-2 py-1">{customer?.name}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1">Phone</td>
                                    <td>:</td>
                                    <td className="px-2 py-1">{customer?.phone}</td>
                                </tr>
                                <tr>
                                    <td className="px-2 py-1">Status</td>
                                    <td>:</td>
                                    <td className="px-2 py-1">{customer?.status}</td>
                                </tr>
                            </tbody>
                        </table>
                        <button
                            onClick={(e) => handleCreateInvoice(e)}
                            className="w-full py-2 bg-sky-500 text-white rounded-md"
                        >
                            Submit
                        </button>
                    </div>
                }
                <div
                    className='p-2 text-xs flex flex-wrap items-center border-t'
                >
                    Press
                    <span className="mx-2 px-2 py-1 flex items-center font-semibold border rounded-md"><CiKeyboard size={20} className="inline-block" /> F2 Key</span>
                    select
                    <span className='underline px-1'> Find </span>
                    or
                    <span className='underline px-1'> New Customer </span>
                    Form.
                </div>
            </div>
        </div>
    )
}