import React, { useEffect, useState } from 'react'
import { useNavigate } from 'react-router-dom'

export default function ProtectedRoute(props) {
    const navigate = useNavigate();
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    function checkUserToken() {
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
