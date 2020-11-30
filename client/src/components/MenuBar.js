import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { Menu } from 'semantic-ui-react';

import { AuthContext } from '../context/AuthContext';

const MenuBar = () => {
    const context = useContext(AuthContext);

    //when searching from the searchbar '/login' for example, the Login button is selected
    const pathname = window.location.pathname;
    const path = pathname === '/' ? 'home' : pathname.substring(1);
    const [activeItem, setActiveItem] = useState(path);

    const handleItemClick = (e, { name }) => {
        setActiveItem(name);
    };

    return (
        <Menu pointing secondary size='massive' color='green'>
            <Menu.Item
                name='home'
                active={activeItem === 'home'}
                onClick={handleItemClick}
                as={Link}
                to='/'
            />

            {context.user ? (
                <Menu.Menu position='right'>
                    <Menu.Item
                        name={context.user.username}
                        active
                        // as={Link}
                        // to=`/${context.user.username}`
                    />
                    <Menu.Item
                        name='logout'
                        onClick={context.logout}
                        // as={Link}
                        // to='/register'
                    />
                </Menu.Menu>
            ) : (
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='login'
                        active={activeItem === 'login'}
                        onClick={handleItemClick}
                        as={Link}
                        to='/login'
                    />
                    <Menu.Item
                        name='register'
                        active={activeItem === 'register'}
                        onClick={handleItemClick}
                        as={Link}
                        to='/register'
                    />
                </Menu.Menu>
            )}
        </Menu>
    );
};

export default MenuBar;
