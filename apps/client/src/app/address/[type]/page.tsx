'use client';

import ReactQueryProvider from '@/providers/QueryProvider';

import AddressTypePageContent from './AddressTypePageContent';

export default function AddressCUPage() {
    return (
        <ReactQueryProvider>
            <AddressTypePageContent />
        </ReactQueryProvider>
    );
}
