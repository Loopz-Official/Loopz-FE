import { PAYMENT_MATHOD } from '@/constants/paymentMethod';

export default function PaymentMethodSection() {
    return (
        <>
            <header>
                <h2 className="text-body-01 font-semibold">결제 수단</h2>
            </header>

            {PAYMENT_MATHOD.map(({ label, value }) => (
                <div key={label}>
                    <hr className="border-gray-regular my-3" />

                    <div className="gap-15 text-body-03 grid grid-cols-[auto_1fr] font-normal">
                        <div className="text-gray-dark">{label}</div>
                        <div>{value}</div>
                    </div>
                </div>
            ))}
        </>
    );
}
