import React, { useEffect, useState } from 'react'
import { useNavigate, useLocation } from 'react-router-dom'

export default function ProtectedRoute(props) {
    const navigate = useNavigate();
    const location = useLocation();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function checkUserToken() {
        sessionStorage.url = location.pathname;
        const userToken = sessionStorage.getItem('auth');
        if (!userToken || userToken == undefined) {
            setIsLoggedIn(false);
            return navigate('/login');
        }
        setIsLoggedIn(true);
    }

    useEffect(() => {
        checkUserToken();
    }, [isLoggedIn]);

    return (
        <>
            {isLoggedIn ? props.children : null}
        </>
    )
}
