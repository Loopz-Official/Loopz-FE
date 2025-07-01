'use client';

import ReactQueryProvider from '@/providers/QueryProvider';

import AddressPageContent from './AddressPageContent';

export default function AddressPage() {
    return (
        <ReactQueryProvider>
            <AddressPageContent />
        </ReactQueryProvider>
    );
}
