import React from 'react'
import {Outlet} from 'react-router-dom';
import Header from '../common/Header';

export default function Home() {
    return (
        <>
            <Header />
            <Outlet />
        </>
    )
}
