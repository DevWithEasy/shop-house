export default function Add_product_invoice({ findProduct, name, price, quantity, setQuantity, addProduct, handleCancel }) {

  return (
    <div
      id='wrapper'
      onClick={(e) => handleCancel(e)}
      className='absolute left-0 top-0 w-full h-screen bg-slate-400/50'
    >
      <form
        onSubmit={(e) => addProduct(e)}
        className='w-4/12 mx-auto mt-10 p-4 bg-white space-y-3 shadow-lg rounded-lg'
      >
        <h2 className='pb-2 text-lg font-medium border-b'>Product</h2>
        <div className="space-y-1">
          <label className="text-sm">Name : </label>
          <input
            name={name}
            value={name}
            className='w-full p-2 focus:outline-none border rounded-md'
            readOnly
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm">Price : </label>
          <input
            name={price}
            value={price}
            className='w-full p-2 focus:outline-none border rounded-md'
            readOnly
          />
        </div>
        <div className="space-y-1">
          <label className="text-sm">Quantity : ( {findProduct?.quantity} in Stock )</label>
          <input
            name='qty'
            value={quantity}
            type='number'
            onChange={(e) => setQuantity(Number(e.target.value))}
            autoFocus
            className={`w-full p-2 rounded-md border ${findProduct?.quantity < quantity ? 'focus:outline-red-500' : 'focus:outline-sky-500'}`}
          />
        </div>
        <div className='flex justify-end'>
          <button
            type='submit'
            className='px-4 py-2 bg-sky-500 text-white rounded-md'
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  )
}