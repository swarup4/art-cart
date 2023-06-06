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
            email: 'warup.saha004@hotmail.com',
            number: 9035845781
        },
        status: 'Order placed',
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
        status: 'Order placed',
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
        status: 'Order placed',
        deliveryStatus: 'Preparing to ship on March 24, 2021',
        imageSrc: 'https://tailwindui.com/img/ecommerce-images/shopping-cart-page-04-product-01.jpg',
        description: 'Salmon orange fabric pouch with match zipper, gray zipper pull, and adjustable hip belt.',
    }
    // More products...
]
export default function OrderList() {
    return (
        <div>
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between pb-6 pt-24">
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
                                                <li key={product.id} className="flex py-10 shadow border border-gray-200 bg-gray-50 p-8 mb-8 rounded-lg">
                                                    <div className="h-48 w-48 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                                        <img src={product.imageSrc} alt={product.imageAlt} className="h-full w-full object-cover object-center" />
                                                    </div>

                                                    <div className='ml-6 flex flex-1 col-span-4'>
                                                        <div className="grid col-span-2 gap-x-8">
                                                            <div>
                                                                <div className="flex text-sm font-normal text-gray-900">
                                                                    <h3><a href={product.href}>{product.name}</a></h3>
                                                                </div>
                                                                <p className="mt-1 text-sm text-gray-500">{product.price}</p>
                                                                <p className="mt-1 text-sm text-gray-500">{product.description}</p>
                                                            </div>
                                                        </div>
                                                        <div className='grid col-span-1'>
                                                            <p>Delevery Address</p>
                                                            <p>{product.deliveryAddress}</p>
                                                        </div>
                                                        <div className='grid col-span-1'>
                                                            <p>Shipping Update</p>
                                                            <p>{product.shippingUpdates.email}</p>
                                                            <p>{product.shippingUpdates.number}</p>
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
