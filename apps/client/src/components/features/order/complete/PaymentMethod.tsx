import {
    ORDER_STATUS_META_MAP,
    PAYMENT_METHOD_LABEL_MAP,
} from '@/constants/order';
import { OrderStatus, PaymentMethodEnum } from '@/schemas/order';

interface PaymentMethodSectionProps {
    paymentMethod: PaymentMethodEnum;
    status: OrderStatus;
}

export default function PaymentMethodSection({
    paymentMethod,
    status,
}: PaymentMethodSectionProps) {
    return (
        <>
            <header>
                <h2 className="text-body-01 font-semibold">결제 수단</h2>
            </header>

            <div>
                <hr className="border-gray-regular my-3" />
                <div className="gap-15 text-body-03 grid grid-cols-[auto_1fr] font-normal">
                    <div className="text-gray-dark">결제방법</div>
                    <div>
                        {paymentMethod
                            ? PAYMENT_METHOD_LABEL_MAP[paymentMethod]
                            : '-'}
                    </div>
                </div>
            </div>
            <div>
                <hr className="border-gray-regular my-3" />
                <div className="gap-15 text-body-03 grid grid-cols-[auto_1fr] font-normal">
                    <div className="text-gray-dark">주문상태</div>
                    <div>
                        {status ? ORDER_STATUS_META_MAP[status].label : '-'}
                    </div>
                </div>
            </div>
        </>
    );
}
