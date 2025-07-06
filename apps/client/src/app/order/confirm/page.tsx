import SuspenseWrapper from '@/components/common/SuspenseWrapper';

import OrderConfirmPageContent from './OrderConfirmPageContent';

export default function OrderConfirmPage() {
    return (
        <SuspenseWrapper>
            <OrderConfirmPageContent />
        </SuspenseWrapper>
    );
}
