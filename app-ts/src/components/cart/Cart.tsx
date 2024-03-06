import React from 'react'
import { XMarkIcon, CheckIcon, PlusIcon, MinusIcon } from '@heroicons/react/24/outline'
import { addItem, removeItem, clearItem } from '../../store/cart/cartSlice'
import Receipt from './Receipt'
import { useDispatch, useSelector } from 'react-redux'
import { Item, Items, ItemsQty } from './datatype'


export default function Cart() {
    const items: Items[] = useSelector(({ cart }: Item) => cart.items);
    const dispatch = useDispatch()

    function filterItems(items: Items[]) {
        let cartItems: ItemsQty[] = [];
        let price: number = 0;
        const data = items.reduce((acc: any, elem: Items) => {
            if (acc[elem.id]) {
                acc[elem.id].quantity += 1;
                price += acc[elem.id].price;
            } else {
                let obj: ItemsQty = { ...elem, quantity: 1 }
                acc[elem.id] = obj;
                price += acc[elem.id].price;
            }
            return acc;
        }, {});

        for (const key in data) {
            cartItems.push(data[key]);
        }
        return { price, cartItems };
    }
    const { price, cartItems } = filterItems(items);


    return (
        <div>
            <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex items-baseline justify-between pb-6 pt-16">
                    <h1 className="text-4xl font-bold tracking-tight text-gray-900">Shopping Cart</h1>
                </div>

                <section aria-labelledby="products-heading" className="pb-24 pt-6">
                    <div className="grid grid-cols-1 gap-x-8 gap-y-10 lg:grid-cols-5">
                        <section aria-labelledby="products-heading" className="pb-24 lg:col-span-3">
                            <div className="mt-8">
                                <div className="flow-root">
                                    <ul role="list" className="-my-6 divide-y divide-gray-200">
                                        {cartItems.map((product) => (
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
                                                            <p className="mt-1 text-sm text-gray-500">${product.price}</p>
                                                        </div>
                                                        <div className="flex flex-1 items-start justify-between text-sm">
                                                            {/* <p className="text-gray-500">
                                                                    <select id="country" name="country" autoComplete="country-name"
                                                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 w-16"
                                                                    >
                                                                        {count.map(x => (
                                                                            <option key={x.id} value={x.value}>{x.value}</option>
                                                                        ))}
                                                                    </select>
                                                                </p> */}
                                                            <div className="flex text-gray-500 border border-gray-300 rounded-md">
                                                                <button onClick={() => dispatch(removeItem(product.id))} className='p-2 inline-flex flex text-gray-500 hover:text-gray-500 border-r border-gray-300'>
                                                                    <MinusIcon className="h-4 w-4" />
                                                                </button>
                                                                <div className='py-1 px-2 inline-flex text-gray-600'>
                                                                    <span className='h-6 w-8 text-center leading-6'>{product.quantity}</span>
                                                                </div>
                                                                <button onClick={() => dispatch(addItem(product))} className='p-2 inline-flex flex text-gray-500 hover:text-gray-500 border-l border-gray-300'>
                                                                    <PlusIcon className="h-4 w-4" />
                                                                </button>
                                                            </div>

                                                            <button type="button" className="-m-2 p-2 text-gray-400 hover:text-gray-500">
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
                            <Receipt price={price} />
                        </section>
                    </div>
                </section>
            </main>
        </div>
    )
}
