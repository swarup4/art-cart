import React from 'react'

export default function Receipt(props) {

    function totalPrice (price){
        let total = price + (price * 10/100) + 5
        return total
    }
    let total = totalPrice(props.price);

    return (
        <div className='bg-slate-50 p-8 mt-2 rounded-lg'>
            <h2 className='font-normal text-lg'>Order summary</h2>
            <div className='lf'>
                <div className='text-sm pt-4 mt-4 flex justify-between text-base text-gray-900'>
                    <span className='font-light'>Sub Total</span>
                    <span className='font-medium'>${props.price}</span>
                </div>
                <div className='text-sm pt-4 mt-4 flex justify-between text-base text-gray-900 border-t border-gray-200'>
                    <span className='font-light'>Tax estimate</span>
                    <span className='font-medium'>${props.price * (10/100)}</span>
                </div>
                <div className='text-sm pt-4 mt-4 flex justify-between text-base text-gray-900 border-t border-gray-200'>
                    <span className='font-light'>Delivery Charge</span>
                    <span className='font-medium'>$5.00</span>
                </div>
                <div className='text-base pt-4 mt-4 font-medium flex justify-between text-base text-gray-900 border-t border-gray-200'>
                    <span>Order total</span>
                    <span>${total}</span>
                </div>
                <div className='mt-6'>
                    <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                        Checkout
                    </button>
                </div>
            </div>
        </div>
    )
}
