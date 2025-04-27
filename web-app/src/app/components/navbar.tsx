'use client';

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import Link from "next/link";
import './navbar.css'

export default function Navbar() {
    return (
        <div className='navbarContainer'>
            <Box sx={{ flexGrow: 1 }}>
                <AppBar className='navbar' position="static">
                    <Toolbar>
                        <Button className='navButtons' variant='outlined' component={Link} href="/">Home</Button>
                        <Button className='navButtons' variant='outlined' component={Link} href="/flashButtons">Flash Buttons</Button>
                        <Button className='navButtons' variant='outlined' component={Link} href="/RGBLight">RGB Light</Button>
                    </Toolbar>
                </AppBar>
            </Box>
        </div>
    );
}