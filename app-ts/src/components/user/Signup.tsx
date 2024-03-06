import React, { useReducer } from 'react'
import { Link } from 'react-router-dom'

import { Signups } from './datatype';


export default function Signup() {

    const initialState: Signups = {
        fname: '',
        lname: '',
        username: '',
        email: '',
        password: ''
    };

    function reducer(state: any, action: any) {
        switch (action.type) {
            case 'fname':
                return {
                    ...state, fname: action.data
                }
            case 'lname':
                return {
                    ...state, lname: action.data
                }
            case 'username':
                return {
                    ...state, username: action.data
                }
            case 'email':
                return {
                    ...state, email: action.data
                }
            case 'password':
                return {
                    ...state, password: action.data
                }
            default:
                break
        }
        throw Error('Unknown action: ' + action.type);
    }

    const [state, dispatch] = useReducer(reducer, initialState);

    function addValue(ev: any, type: any) {
        dispatch({
            type: type,
            data: ev.target.value
        })
    }

    return (
        <div className='full-height'>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 pt-0 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <img
                        className="mx-auto h-10 w-auto"
                        src="https://tailwindui.com/img/logos/mark.svg?color=indigo&shade=600"
                        alt="Your Company"
                    />
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        Sign in to your account
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form className="space-y-6" action="#" method="POST">
                        <div>
                            <label htmlFor="text" className="block text-sm font-medium leading-6 text-gray-900">
                                Full Name
                            </label>
                            <div className="mt-2">
                                <div className='grid grid-flow-row-dense grid-cols-2 gap-x-4'>
                                    <input id="fname" name="fname" type="text" autoComplete="fname" placeholder="Enter First Name" value={state.fname} onChange={(ev) => addValue(ev, 'fname')} required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                    <input id="lname" name="lname" type="text" autoComplete="lname" placeholder="Enter Last Name" onChange={(ev) => addValue(ev, 'lname')} required
                                        className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                    />
                                </div>
                            </div>
                        </div>

                        <div>
                            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
                                Username
                            </label>
                            <div className="mt-2">
                                <input id="username" name="username" type="text" autoComplete="username" placeholder="Enter Username" onChange={(ev) => addValue(ev, 'username')} required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-sm font-medium leading-6 text-gray-900">
                                Email address
                            </label>
                            <div className="mt-2">
                                <input id="email" name="email" type="email" autoComplete="email" placeholder="Enter Email" onChange={(ev) => addValue(ev, 'email')} required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                                Password
                            </label>
                            <div className="mt-2">
                                <input id="password" name="password" type="password" autoComplete="current-password" placeholder="Enter Email" onChange={(ev) => addValue(ev, 'password')} required
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>

                        <div>
                            <button type="submit" className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                                Sign up
                            </button>
                        </div>
                    </form>

                    <div className="mt-10 text-center text-sm text-gray-500">
                        <div className='relative mb-3'>
                            <div className='border-t w-full absolute top-2.5'></div>
                            <div className='relative'>
                                <span className='bg-white px-2.5'>Do you have account</span>
                            </div>
                        </div>
                        <Link to='/login' className="font-semibold text-indigo-600 hover:text-indigo-500">
                            Sign In
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}
