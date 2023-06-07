import React from 'react'

const products = [
    {
        id: 1,
        name: 'Throwback Hip Bag',
        href: '#',
        price: '$90.00',
        quantity: 1,
        deliveryAddress: 'Floyd Miles, 7363 Cynthia Pass, Toronto, ON N3Y 4H8',
        shippingUpdates: {
            email: 'Swarup.saha004@hotmail.com',
            number: 9035845781
        },
        status: 1,
        deliveryStatus: 'Preparing to ship on March 24, 2021',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        description: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    }, {
        id: 2,
        name: 'Medium Stuff Satchel',
        href: '#',
        price: '$32.00',
        quantity: 1,
        deliveryAddress: 'Floyd Miles, 7363 Cynthia Pass, Toronto, ON N3Y 4H8',
        shippingUpdates: {
            email: 'warup.saha004@hotmail.com',
            number: 9035845781
        },
        status: 3,
        deliveryStatus: 'Preparing to ship on March 24, 2021',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-02.jpg',
        description:
            'Front of satchel with blue canvas body, black straps and handle, drawstring top, and front zipper pouch.',
    }, {
        id: 3,
        name: 'Throwback Hip Bag',
        href: '#',
        price: '$90.00',
        quantity: 1,
        deliveryAddress: 'Floyd Miles, 7363 Cynthia Pass, Toronto, ON N3Y 4H8',
        shippingUpdates: {
            email: 'warup.saha004@hotmail.com',
            number: 9035845781
        },
        status: 4,
        deliveryStatus: 'Preparing to ship on March 24, 2021',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        description: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    }
    // More products...
]

export default function OrderList() {

    function getStatus(status) {
        let percent;
        switch (status) {
            case 1:
                percent = 4
                break;
            case 2:
                percent = 38
                break;
            case 3:
                percent = 63
                break;
            default:
                percent = 100
                break;
        }
        return percent
    }

    function getCompleteStatus(status, statusId) {
        if (status === statusId || status > statusId) {
            return 'text-blue-600'
        } else {
            return ''
        }
    }

    return (
        <div>
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between pb-6 pt-16">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Order</h1>
                </div>

                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                    <form>
                        <div className="grid grid-cols-1 gap-x-8 gap-y-10">

                            <section aria-labelledby="products-heading" className="pb-24 lg:col-span-3">
                                <div className="mt-8">
                                    <div className="flow-root">
                                        <ul role="list" className="-my-6 divide-y divide-gray-200">
                                            {products.map((product) => (
                                                <li key={product.id} className="shadow-md border border-gray-200 mb-8 rounded-lg">
                                                    <div className='flex flex-1 p-8 border-b border-gray-200'>
                                                        <div className="h-48 w-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                            <img src={product.imageSrc} alt={product.imageAlt} className="h-full w-full object-cover object-center" />
                                                        </div>

                                                        <div className='ml-6 grid grid-flow-row-dense grid-cols-4 gap-x-8'>
                                                            <div className="col-span-2 gap-x-8">
                                                                <div>
                                                                    <p className="text-base font-medium text-gray-900">
                                                                        <a href={product.href}>{product.name}</a>
                                                                    </p>
                                                                    <p className="mt-2 text-sm text-gray-500">{product.price}</p>
                                                                    <p className="mt-3 text-sm text-gray-500">{product.description}</p>
                                                                </div>
                                                            </div>
                                                            <div className='col-span-1'>
                                                                <p className='text-sm text-gray-900 font-medium'>Delevery Address</p>
                                                                <p className="mt-3 text-sm text-gray-500">{product.deliveryAddress}</p>
                                                            </div>
                                                            <div className='col-span-1'>
                                                                <p className='text-sm text-gray-900 font-medium'>Shipping Update</p>
                                                                <p className="mt-3 text-sm text-gray-500">{product.shippingUpdates.email}</p>
                                                                <p className="mt-1 text-sm text-gray-500">{product.shippingUpdates.number}</p>
                                                            </div>
                                                        </div>
                                                    </div>

                                                    <div className='p-8'>
                                                        <p className='text-gray-900 text-sm font-medium'>Preparing to ship on March 24, 2021</p>
                                                        <div className='mt-6'>
                                                            <div className="w-full bg-gray-200 rounded-full h-2 dark:bg-gray-700">
                                                                <div className="bg-blue-600 h-2 rounded-full" style={{ width: getStatus(product.status) + '%' }}></div>
                                                            </div>
                                                            <div className='grid grid-flow-row-dense grid-cols-4 gap-x-8 mt-6 text-sm text-gray-600'>
                                                                <p className={`text-left ${getCompleteStatus(product.status, 1)}`}>Order placed</p>
                                                                <p className={`text-center ${getCompleteStatus(product.status, 2)}`}>Processing</p>
                                                                <p className={`text-center ${getCompleteStatus(product.status, 3)}`}>Shipped</p>
                                                                <p className={`text-right ${getCompleteStatus(product.status, 4)}`}>Delivered</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </li>
                                            ))}
                                        </ul>
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
