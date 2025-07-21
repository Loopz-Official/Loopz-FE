import clsx from 'clsx';

import { OrderSummaryContent } from '@/types/myOrder';

interface OrderSummaryRowProps {
    label: OrderSummaryContent;
    value: OrderSummaryContent;
    gap?: number;
}

const renderContent = (content: OrderSummaryContent) =>
    typeof content === 'string' ? (
        content
    ) : (
        <span className={content.className}>{content.text}</span>
    );

const OrderSummaryRow = ({ label, value, gap }: OrderSummaryRowProps) => (
    <div
        className={clsx(
            'text-body-03 flex font-normal',
            gap ? `gap-${gap}` : 'justify-between'
        )}
    >
        <div className="text-gray-03 min-w-16">{renderContent(label)}</div>
        <div>{renderContent(value)}</div>
    </div>
);

export default OrderSummaryRow;
