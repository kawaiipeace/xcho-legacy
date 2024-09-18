import { Metadata } from 'next';
import React from 'react';
import Lists from '@/components/incoming/lists';
import { ContextMenuProvider } from 'mantine-contextmenu';

export const metadata: Metadata = {
    title: 'กล่องขาเข้า',
};

const Incoming = () => {
    return (
        <>
            <ContextMenuProvider>
                <Lists />
            </ContextMenuProvider>
        </>
    );
};

export default Incoming;
