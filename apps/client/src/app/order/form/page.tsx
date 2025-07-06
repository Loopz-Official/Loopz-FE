import SuspenseWrapper from '@/components/common/SuspenseWrapper';

import OrderFormPageContent from './OrderFormPageContent';

export default function OrderFormPage() {
    return (
        <SuspenseWrapper>
            <OrderFormPageContent />
        </SuspenseWrapper>
    );
}
