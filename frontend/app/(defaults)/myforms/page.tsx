import { Metadata } from 'next';
import React from 'react';
import Lists from '@/components/myforms/lists';
import { ContextMenuProvider } from 'mantine-contextmenu';

export const metadata: Metadata = {
    title: 'ฟอร์มของคุณ',
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
