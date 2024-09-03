import React from 'react';
import { Heading } from '@chakra-ui/react';
import NavBar from './NavBar';
import '../assets/css/style.css';

const HeaderBanner = () => {
    return (
        <div className='banner'>
            <Heading as="h2" size="xl" mb={4} textAlign="center">
                Employee Management System
            </Heading>
            <NavBar />

        </div>

    );
};

export default HeaderBanner;