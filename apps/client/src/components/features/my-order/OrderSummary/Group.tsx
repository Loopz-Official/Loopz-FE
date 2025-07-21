import HorizontalDivider from '@/components/common/Divider/Horizontal';
import { OrderSummaryItem } from '@/types/myOrder';

import OrderSummaryRow from './Row';

export interface OrderSummaryGroup {
    title: string;
    items: OrderSummaryItem[];
    gap?: number;
}

const OrderSummaryGroup = ({ title, items, gap }: OrderSummaryGroup) => (
    <section className="mb-10 flex w-full flex-col gap-5">
        <h3 className="text-body-01 border-b-[1.5px] border-black py-3 font-semibold">
            {title}
        </h3>
        <div className="flex flex-col gap-3">
            {items.map((item, idx) =>
                item.type === 'row' ? (
                    <OrderSummaryRow
                        key={idx}
                        label={item.label}
                        value={item.value}
                        gap={gap}
                    />
                ) : (
                    <HorizontalDivider key={idx} />
                )
            )}
        </div>
    </section>
);

export default OrderSummaryGroup;
