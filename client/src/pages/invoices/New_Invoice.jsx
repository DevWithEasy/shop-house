import React, { useRef, useState } from 'react';
import BarcodeScanner from '../../components/new_invoice/Scanner';
import axios from 'axios';
import baseUrl from '../../utils/baseUrl';
import Add_product_invoice from '../../components/new_invoice/Add_product_invoice';
import { useToast } from '@chakra-ui/react';
import Product_Select_invoice from '../../components/new_invoice/Product_Select_invoice';
import Product_list_invoice from '../../components/new_invoice/Product_list_invoice';
import Heading from '../../components/Heading';
import useProductStore from '../../store/productStore'
import { MdOutlineRefresh } from 'react-icons/md'
import { LuRefreshCw } from 'react-icons/lu'
import Summary_invoice from '../../components/new_invoice/Summary_invoice';

const New_Invoice = () => {
    const { cart, addCart, resetCart } = useProductStore()
    const toast = useToast()
    const [isAdd, setIsAdd] = useState(false)
    const [search, setSearch] = useState('')
    const [find, setFind] = useState([])
    const [_id, set_id] = useState('')
    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [quantity, setQuantity] = useState('')
    const [isSelect, setIsSelect] = useState(false)
    const [scaneSearch, setScaneSearch] = useState('')
    const [findProduct, setFindProduct] = useState({})

    const searchRef = useRef(null)
    const selectRef = useRef(null)
    const audioRef = useRef(null)

    const handleScanSearch = async (result) => {
        const id = scaneSearch
        const find = cart.find(product => product._id === result)
        if (find) {
            if (!toast.isActive(id)) {
                toast({
                    id,
                    title: 'Already added.',
                    status: 'error',
                    isClosable: true,
                })
            }
            return
        }
        if (!scaneSearch.length === 24) {
            return toast({
                id: result,
                title: 'QR not accurate againt our policy',
                status: 'error',
                isClosable: true,
            })
        } else {
            audioRef.current.play();
        }

        try {
            if (result === scaneSearch) {
                return setScaneSearch('')
            }
            const res = await axios.get(`${baseUrl}/api/product/find/${result}`,{
                headers :{
                    authorization : localStorage.getItem('token')
                }
            })
            if (res.data.success) {
                setFindProduct(res.data.data)
                set_id(res.data.data._id)
                setName(res.data.data.name)
                setPrice(res.data.data.price)
                setIsAdd(!isAdd)
            }
        } catch (error) {
            console.log(error)
        }

    }

    const handleSearch = async (query) => {
        setSearch(query)
        if (query.length < 3) return

        try {
            const res = await axios.get(`${baseUrl}/api/product/search?q=${search}`,{
                headers :{
                    authorization : localStorage.getItem('token')
                }
            })

            if (res.data.success) {
                setFind(res.data.data)
                setIsSelect(true)
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
        const product = find.find(product => product._id === selectedOption.value)
        setFindProduct(product)
        setIsAdd(!isAdd)
        set_id(product._id)
        setName(product.name)
        setPrice(product.price)
        setIsSelect(!isSelect)
    }


    const addProduct = (e) => {
        e.preventDefault()

        if (!quantity) return

        if (findProduct.quantity < quantity) {
            return toast({
                title: `${quantity} pcs product isn't stock.`,
                status: 'error',
                isClosable: true,
            })
        }

        const find = cart.find(product => product._id === _id)

        if (find) {
            return toast({
                title: 'already added this product.',
                status: 'error',
                isClosable: true,
            })
        } else {
            addCart({ _id, name, price, quantity })
            set_id('')
            setName('')
            setPrice('')
            setQuantity('')
            setIsAdd(!isAdd)
            setSearch('')
            if (searchRef.current) {
                searchRef.current.focus();
            }
            setScaneSearch('')
        }

    }

    const handleCancel = (e) => {
        if (e.target.id === 'wrapper') {
            set_id('')
            setName('')
            setPrice('')
            setQuantity('')
            setIsAdd(!isAdd)
            setScaneSearch('')
        }
    }


    return (
        <div
            className='relative h-screen p-2'
        >
            <BarcodeScanner {...{ handleScanSearch, setScaneSearch, audioRef }} />
            <Heading>Create Invoice</Heading>
            <div
                className='flex items-center space-x-3'
            >
                <input
                    type='search'
                    value={search}
                    ref={searchRef}
                    onChange={(e) => handleSearch(e.target.value)}
                    className='mb-2 w-[350px] py-1 px-4 border border-gray-300 focus:outline-none placeholder:text-gray-300 placeholder:text-sm rounded-full'
                    placeholder='find by product name'
                />
                <MdOutlineRefresh
                    size={25}
                    onClick={() => resetCart()}
                    className='mb-2 hover:text-red-500 cursor-pointer'
                />
                <LuRefreshCw
                    size={20}
                    onClick={() => setScaneSearch('')}
                    className='mb-2 hover:text-red-500 cursor-pointer'
                />
            </div>

            <div
                className='flex justify-between space-x-4'
            >
                <Product_list_invoice />
                <Summary_invoice />
            </div>

            {find.length > 0 && isSelect &&
                <Product_Select_invoice {...{
                    find,
                    selectRef,
                    setProduct
                }} />
            }

            {
                isAdd && <Add_product_invoice {...{
                    findProduct,
                    name,
                    price,
                    quantity,
                    setQuantity,
                    addProduct,
                    handleCancel
                }} />
            }
        </div>
    );
};

export default New_Invoice;