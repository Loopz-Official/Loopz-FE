import { useMemo } from 'react';

import { OrderSummaryGroup } from '@/components/features/my-order/OrderSummary/Group';
import { OrderDetailResponse } from '@/schemas/order';
import { SummaryGroupConfig } from '@/types/myOrder';

export const useSummaryGroups = (
    data: OrderDetailResponse | undefined,
    configs: SummaryGroupConfig[]
): OrderSummaryGroup[] => {
    return useMemo(() => {
        if (!data) return [];

        return configs.map(({ title, getItems, gap }) => ({
            title,
            items: getItems(data),
            gap,
        }));
    }, [data, configs]);
};
