import { Container } from '@mui/material';
import React, { ReactNode } from 'react';
import Footer from '../Footer/footer';
import Header from '../Header/header';

interface LayoutProps {
    children: ReactNode,
}

export default function Layout({children}: LayoutProps) {
    return (
        <div>
            <Header />
            <Container >
                <div style={{ marginTop: "4rem" }}>
                    {children}
                </div>    
            </Container>
            <Footer />
        </div>
    );
}