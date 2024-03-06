import React, { Fragment, useEffect, useState } from 'react'
import { Link, useLocation, useNavigate } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { Dialog, Popover, Disclosure, Transition } from '@headlessui/react'
import { Bars3Icon, MagnifyingGlassIcon, ShoppingBagIcon, XMarkIcon, CursorArrowRaysIcon, FingerPrintIcon, SquaresPlusIcon, UserIcon, PowerIcon } from '@heroicons/react/24/outline'
import { ChevronDownIcon } from '@heroicons/react/20/solid'

import { Navigation, Solutions } from './datatype'


const navigation: Navigation[] = [
    { name: 'Home', href: '' },
    { name: 'Order', href: 'user/order' },
]

const solutions: Array<Solutions> = [
    { name: 'My Profile', description: 'Get a better understanding of your traffic', href: '#', icon: UserIcon },
    { name: 'Wishlist', description: 'Speak directly to your customers', href: '#', icon: CursorArrowRaysIcon },
    { name: 'Security', description: "Your customers' data will be safe and secure", href: '#', icon: FingerPrintIcon },
    { name: 'Integrations', description: 'Connect with third-party tools', href: '#', icon: SquaresPlusIcon },
    // { name: 'Logout', description: 'Build strategic funnels that will convert', click: 'logout', icon: PowerIcon },
];

function classNames(...classes: any[]) {
    return classes.filter(Boolean).join(' ')
}

export default function Header() {

    const navigate = useNavigate();
    const [open, setOpen] = useState<boolean>(false);
    const [user, setUser] = useState<boolean>(false);

    const cartItems = useSelector((store: any) => store.cart.items);
    const location = useLocation();

    useEffect(() => {
        const userToken: string | null = sessionStorage.getItem('auth');
        if (userToken || userToken != null) {
            setUser(true);
        }
    }, [])

    function logout() {
        sessionStorage.removeItem('auth');
        sessionStorage.removeItem('url');
        setUser(false);
        navigate('/')
    }

    function redirectPage() {
        sessionStorage.url = location.pathname;
    }

    return (
        <div className="bg-white">
            {/* Mobile menu */}
            <Transition.Root show={open} as={Fragment}>
                <Dialog as="div" className="relative z-40 lg:hidden" onClose={setOpen}>
                    <Transition.Child as={Fragment}
                        enter="transition-opacity ease-linear duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="transition-opacity ease-linear duration-300"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <div className="fixed inset-0 bg-black bg-opacity-25" />
                    </Transition.Child>

                    <div className="fixed inset-0 z-40 flex">
                        <Transition.Child as={Fragment}
                            enter="transition ease-in-out duration-300 transform"
                            enterFrom="-translate-x-full"
                            enterTo="translate-x-0"
                            leave="transition ease-in-out duration-300 transform"
                            leaveFrom="translate-x-0"
                            leaveTo="-translate-x-full"
                        >
                            <Dialog.Panel className="relative flex w-full max-w-xs flex-col overflow-y-auto bg-white pb-12 shadow-xl">
                                <div className="flex px-4 pb-2 pt-5">
                                    <button type="button" className="-m-2 inline-flex items-center justify-center rounded-md p-2 text-gray-400" onClick={() => setOpen(false)}>
                                        <span className="sr-only">Close menu</span>
                                        <XMarkIcon className="h-6 w-6" aria-hidden="true" />
                                    </button>
                                </div>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">
                                    {navigation.map((page) => (
                                        <div key={page.name} className="flow-root">
                                            <Link to={page.href} className="-m-2 block p-2 font-medium text-gray-900">
                                                {page.name}
                                            </Link>
                                        </div>
                                    ))}
                                </div>

                                <div className="space-y-6 border-t border-gray-200 px-4 py-6">

                                    {user ? (
                                        <Disclosure as="div" className="-mx-3">
                                            {({ open }) => (
                                                <>
                                                    <Disclosure.Button className="flex w-full items-center justify-between rounded-lg py-2 pl-3 pr-3.5 text-base font-semibold leading-7 text-gray-900 hover:bg-gray-50">
                                                        User
                                                        <ChevronDownIcon className={classNames(open ? 'rotate-180' : '', 'h-5 w-5 flex-none')} aria-hidden="true" />
                                                    </Disclosure.Button>
                                                    <Disclosure.Panel className="mt-2 space-y-2">
                                                        {solutions.map((item) => (
                                                            <Disclosure.Button key={item.name} as="a" href={item.href}
                                                                className="block rounded-lg py-2 pl-6 pr-3 text-sm font-semibold leading-7 text-gray-900 hover:bg-gray-50"
                                                            >
                                                                {item.name}
                                                            </Disclosure.Button>
                                                        ))}
                                                    </Disclosure.Panel>
                                                </>
                                            )}
                                        </Disclosure>
                                    ) : (
                                        <>
                                            <div className="flow-root">
                                                <Link to='/login' onClick={redirectPage} className="-m-2 block p-2 font-medium text-gray-900">
                                                    Sign in
                                                </Link>
                                            </div>
                                            <div className="flow-root">
                                                <Link to='/signup' onClick={redirectPage} className="-m-2 block p-2 font-medium text-gray-900">
                                                    Create account
                                                </Link>
                                            </div>
                                        </>
                                    )}

                                </div>

                                <div className="border-t border-gray-200 px-4 py-6">
                                    <Link to="#" className="-m-2 flex items-center p-2">
                                        <img src="https://tailwindui.com/img/flags/flag-canada.svg" className="block h-auto w-5 flex-shrink-0" />
                                        <span className="ml-3 block text-base font-medium text-gray-900">CAD</span>
                                        <span className="sr-only">, change currency</span>
                                    </Link>
                                </div>
                            </Dialog.Panel>
                        </Transition.Child>
                    </div>
                </Dialog>
            </Transition.Root>

            {/* Desktop View */}
            <header className="relative bg-white">
                <nav aria-label="Top" className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                    {/* <div className="border-b border-gray-200"> */}
                    <div className="flex h-16 items-center">
                        <button type="button" className="rounded-md bg-white p-2 text-gray-400 lg:hidden" onClick={() => setOpen(true)} >
                            <span className="sr-only">Open menu</span>
                            <Bars3Icon className="h-6 w-6" aria-hidden="true" />
                        </button>

                        {/* Logo */}
                        <div className="ml-4 flex lg:ml-0">
                            <a href="#">
                                <span className="sr-only">Your Company</span>
                                <img className="h-8 w-auto" src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600" alt="" />
                            </a>
                        </div>

                        {/* Flyout menus */}
                        <Popover.Group className="hidden lg:ml-8 lg:block lg:self-stretch">
                            <div className="flex h-full space-x-8">
                                {navigation.map((page) => (
                                    <Link key={page.name} to={page.href} className="flex items-center text-sm font-medium text-gray-700 hover:text-gray-800">
                                        {page.name}
                                    </Link>
                                ))}
                            </div>
                        </Popover.Group>

                        <div className="ml-auto flex items-center">
                            <div className="hidden lg:flex lg:flex-1 lg:items-center lg:justify-end lg:space-x-6">
                                {user ? (
                                    <Popover className="relative">
                                        <Link to={''}>
                                            <Popover.Button className="inline-flex items-center gap-x-1 text-sm font-semibold leading-6 text-gray-900">
                                                <span>User</span>
                                                <ChevronDownIcon className="h-5 w-5" aria-hidden="true" />
                                            </Popover.Button>
                                        </Link>

                                        <Transition as={Fragment} enter="transition ease-out duration-200" enterFrom="opacity-0 translate-y-1" enterTo="opacity-100 translate-y-0"
                                            leave="transition ease-in duration-150" leaveFrom="opacity-100 translate-y-0" leaveTo="opacity-0 translate-y-1"
                                        >
                                            <Popover.Panel className="absolute left-1/2 z-10 mt-5 flex w-screen max-w-max -translate-x-1/2 px-4">
                                                <div className="w-screen max-w-md flex-auto overflow-hidden rounded-3xl bg-white text-sm leading-6 shadow-lg ring-1 ring-gray-900/5">
                                                    <div className="p-4">
                                                        {solutions.map((item) => (
                                                            <div key={item.name} className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                                                <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                                    <item.icon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                                                </div>
                                                                <div>
                                                                    <Link to={item.href} className="font-semibold text-gray-900">
                                                                        {item.name}
                                                                        <span className="absolute inset-0" />
                                                                    </Link>
                                                                    <p className="mt-1 text-gray-600">{item.description}</p>
                                                                </div>
                                                            </div>
                                                        ))}

                                                        <div key="Logout" className="group relative flex gap-x-6 rounded-lg p-4 hover:bg-gray-50">
                                                            <div className="mt-1 flex h-11 w-11 flex-none items-center justify-center rounded-lg bg-gray-50 group-hover:bg-white">
                                                                <PowerIcon className="h-6 w-6 text-gray-600 group-hover:text-indigo-600" aria-hidden="true" />
                                                            </div>
                                                            <div>
                                                                <Link className="font-semibold text-gray-900" onClick={logout} to={''}>
                                                                    Logout
                                                                    <span className="absolute inset-0" />
                                                                </Link>
                                                                <p className="mt-1 text-gray-600">Build strategic funnels that will convert</p>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </Popover.Panel>
                                        </Transition>
                                    </Popover>

                                ) : (
                                    <>
                                        <Link to='/login' onClick={redirectPage} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            Sign in
                                        </Link>
                                        <span className="h-6 w-px bg-gray-200" aria-hidden="true" />
                                        <Link to='/signup' onClick={redirectPage} className="text-sm font-medium text-gray-700 hover:text-gray-800">
                                            Create account
                                        </Link>
                                    </>
                                )}
                            </div>

                            <div className="hidden lg:ml-8 lg:flex">
                                <a href="#" className="flex items-center text-gray-700 hover:text-gray-800">
                                    <img src="https://tailwindui.com/img/flags/flag-canada.svg" className="block h-auto w-5 flex-shrink-0" />
                                    <span className="ml-3 block text-sm font-medium">CAD</span>
                                    <span className="sr-only">, change currency</span>
                                </a>
                            </div>

                            {/* Search */}
                            <div className="flex lg:ml-6">
                                <a href="#" className="p-2 text-gray-400 hover:text-gray-500">
                                    <span className="sr-only">Search</span>
                                    <MagnifyingGlassIcon className="h-6 w-6" aria-hidden="true" />
                                </a>
                            </div>

                            {/* Cart */}
                            <div className="ml-4 flow-root lg:ml-6">
                                <Link to={'/user/cart'} className="group -m-2 flex items-center p-2 relative">
                                    <ShoppingBagIcon className="h-6 w-6 flex-shrink-0 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
                                    <span className="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10
                                            absolute ml-3.5 -mt-3 group-hover:bg-red-100">{cartItems.length}</span>
                                    <span className="sr-only">items in cart, view bag</span>
                                </Link>
                            </div>
                        </div>
                    </div>
                    {/* </div> */}
                </nav>
            </header>
        </div>
    )
}
