import React from 'react';
import { Menubar } from 'primereact/menubar';
import {useNavigate} from "react-router-dom";

function Header(){

    const navigate = useNavigate();

    const items = [
        {
            label: 'Login',
            command: () => {navigate('/login')}
        },
        {
            label: 'Signup',
            command: () => {navigate('/signup')}
        },
        {
            label: 'Sections',
            command: () => {navigate('/sections')}
        },
        {
            label: 'Loaned Books',
            command: () => {navigate('/loaned_books/1')}
        },
        {
            label: 'Logout',
            command: () => {navigate('/login')}
        }
    ];



    const onHandleClick = d => {
        items.forEach(b => (b.active = false))
        d.active = true
        console.log('clicked', d)
        navigate(d.label)
    }

    return(
        <Menubar
            model={items}
            handleClick={onHandleClick}
        style={{ 'backgroundColor': '#3F51B5' }}
        />
    )
}
export default Header;