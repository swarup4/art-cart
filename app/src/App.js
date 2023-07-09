import './App.css';
import React from 'react';
import {createBrowserRouter, Outlet, RouterProvider} from 'react-router-dom';

import ProtectedRoute from './routes/ProtectedRoute';
import Home from './components/home/Home';
import HomePage from './components/home/HomePage';
import Login from './components/user/Login';
import Signup from './components/user/Signup';
import Error from './components/common/Error';
import ProductDetails from './components/product/ProductDetails';
import Cart from './components/cart/Cart';
import OrderList from './components/order/OrderList';

function App() {

    const route = createBrowserRouter([
        {
            path: '',
            element: <Home />,
            errorElement: <Error />,
            children: [
                {
                    path: '',
                    element: <HomePage />
                }, {
                    path: 'product/details',
                    element: <ProductDetails />
                }, {
                    path: 'user',
                    element: <ProtectedRoute><Outlet /></ProtectedRoute>,
                    children: [
                        {
                            path: 'order',
                            element: <OrderList />
                        }, {
                            path: 'cart',
                            element: <Cart />
                        }
                    ]
                // }, {
                //     path: 'user',
                //     element: isLoggedIn ? <Outlet /> : <Navigate to="/login" />,
                //     children: [
                //         {
                //             path: 'order',
                //             element: <OrderList />
                //         }
                //     ]
                }
            ]
        }, {
            path: 'login',
            element: <Login />
        }, {
            path: 'signup',
            element: <Signup />
        }
    ])
    return (
        <RouterProvider router={route}></RouterProvider>
    );
}
export default App;