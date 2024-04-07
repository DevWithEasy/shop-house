import React from 'react';
import Select from 'react-select';

const Product_Select_invoice = ({find, selectRef, setProduct }) => {
    const options = find.map(product=> {
        return {
            value : product._id,
            label : product.name
        }
    });
    
    return (
        <div
            className='absolute right-0 top-2 w-1/2 bg-white'
        >
            <Select
                ref={selectRef}
                options={options}
                isSearchable={false}
                menuIsOpen={true}
                onChange={setProduct}
            />
        </div>
    );
};

export default Product_Select_invoice;