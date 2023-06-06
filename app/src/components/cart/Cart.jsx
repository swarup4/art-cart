    import React, { useState } from 'react'
    import { XMarkIcon, CheckIcon } from '@heroicons/react/24/outline'


    const products = [
        {
            id: 1,
            name: 'Throwback Hip Bag',
            href: '#',
            color: 'Salmon',
            price: '$90.00',
            quantity: 1,
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
            imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
        }, {
            id: 2,
            name: 'Medium Stuff Satchel',
            href: '#',
            color: 'Blue',
            price: '$32.00',
            quantity: 1,
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
            imageAlt:
                'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
        }, {
            id: 3,
            name: 'Throwback Hip Bag',
            href: '#',
            color: 'Salmon',
            price: '$90.00',
            quantity: 1,
            imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
            imageAlt: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
        }
        // More products...
    ]

    const count = [
        { id: 1, value: 1 },
        { id: 2, value: 2 },
        { id: 3, value: 3 },
        { id: 4, value: 4 },
        { id: 5, value: 5 },
        { id: 6, value: 6 },
        { id: 7, value: 7 },
        { id: 8, value: 8 },
        { id: 9, value: 9 },
        { id: 10, value: 10 }
    ]

    function classNames(...classes) {
        return classes.filter(Boolean).join(' ')
    }

    export default function Cart() {

        const [open, setOpen] = useState(true);
        const [selected, setSelected] = useState(count[0])

        return (

            <div>
                <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    <div className="flex items-baseline justify-between pb-6 pt-24">
                        <h1 className="text-4xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>
                    </div>

                    <section aria-labelledby="products-heading" className="pb-24 pt-6">
                        <form>
                            <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">

                                <section aria-labelledby="products-heading" className="pb-24 lg:col-span-3">
                                    <div className="mt-8">
                                        <div className="flow-root">
                                            <ul role="list" className="-my-6 divide-y divide-gray-200">
                                                {products.map((product) => (
                                                    <li key={product.id} className="flex py-10 border-t border-gray-200">
                                                        <div className="h-48 w-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img src={product.imageSrc} alt={product.imageAlt} className="h-full w-full object-cover object-center" />
                                                        </div>

                                                        <div className='ml-6 flex flex-1 flex-col justify-between'>
                                                            <div className="grid grid-cols-2 gap-x-8 gap-y-10">
                                                                <div>
                                                                    <div className="flex justify-between text-sm font-normal text-gray-900">
                                                                        <h3><a href={product.href}>{product.name}</a></h3>
                                                                    </div>
                                                                    <p className="mt-1 text-sm text-gray-500">{product.color}</p>
                                                                    <p className="mt-1 text-sm text-gray-500">{product.price}</p>
                                                                </div>
                                                                <div className="flex flex-1 items-start justify-between text-sm">
                                                                    <p className="text-gray-500">
                                                                        <select id="country" name="country" autoComplete="country-name"
                                                                            className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 w-16"
                                                                        >
                                                                            {count.map(x => (
                                                                                <option key={x.id} value={x.value}>{x.value}</option>
                                                                            ))}
                                                                        </select>
                                                                    </p>
                                                                    <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500" onClick={() => setOpen(false)} >
                                                                        <XMarkIcon className="h-4 w-4" aria-hidden="true" />
                                                                    </button>
                                                                </div>
                                                            </div>

                                                            <p className='text-sm flex'>
                                                                <CheckIcon className="h-5 w-5 text-green-500 font-normal" aria-hidden="true" />
                                                                <span className='ml-2 font-light'>In stock</span>
                                                            </p>
                                                        </div>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    </div>
                                </section>

                                <section aria-labelledby="cart-heading" className='col-span-2'>
                                    <div className='bg-slate-50 p-8 mt-2 rounded-lg'>
                                        <h2 className='font-normal text-lg'>Order summary</h2>
                                        <div className='lf'>
                                            <div className='text-sm pt-4 mt-4 flex justify-between text-base text-gray-900'>
                                                <span className='font-light'>Sub Total</span>
                                                <span className='font-medium'>$50.00</span>
                                            </div>
                                            <div className='text-sm pt-4 mt-4 flex justify-between text-base text-gray-900 border-t border-gray-200'>
                                                <span className='font-light'>Shipping estimate</span>
                                                <span className='font-medium'>$50.00</span>
                                            </div>
                                            <div className='text-sm pt-4 mt-4 flex justify-between text-base text-gray-900 border-t border-gray-200'>
                                                <span className='font-light'>Tax estimate</span>
                                                <span className='font-medium'>$50.00</span>
                                            </div>
                                            <div className='text-base pt-4 mt-4 font-medium flex justify-between text-base text-gray-900 border-t border-gray-200'>
                                                <span>Order total</span>
                                                <span>$50.00</span>
                                            </div>
                                            <div className='mt-6'>
                                                <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                                    Checkout
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </section>
                            </div>
                        </form>
                    </section>
                </main>
            </div>
        )
    }
