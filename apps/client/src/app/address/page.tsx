import SuspenseWrapper from '@/components/common/SuspenseWrapper';

import AddressPageContent from './AddressPageContent';

export default function AddressPage() {
    return (
        <SuspenseWrapper>
            <AddressPageContent />
        </SuspenseWrapper>
    );
}
