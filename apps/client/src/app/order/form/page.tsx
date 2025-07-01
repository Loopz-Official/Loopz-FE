'use client';

import ReactQueryProvider from '@/providers/QueryProvider';

import OrderFormContent from './OrderFormPageContent';

export default function OrderFormPage() {
    return (
        <ReactQueryProvider>
            <OrderFormContent />
        </ReactQueryProvider>
    );
}
