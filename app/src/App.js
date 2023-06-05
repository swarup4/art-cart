import './App.css';
import {createBrowserRouter, RouterProvider} from 'react-router-dom';

import Home from './components/home/Home';
import HomePage from './components/home/HomePage';
import Login from './components/user/Login'

function App() {
    const route = createBrowserRouter([
        {
            path: '',
            element: <Home />,
            children: [
                {
                    path: '',
                    element: <HomePage />
                }
            ]
        }, {
            path: 'login',
            element: <Login />
        }
    ])
    return (
        <RouterProvider router={route}></RouterProvider>
    );
}
export default App;