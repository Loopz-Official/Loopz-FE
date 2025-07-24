import { useMutation, useQueryClient } from '@tanstack/react-query';

import { completePayment } from '@/services/api/payment/completePayment';

export const useCompletePaymentMutation = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: async ({
            paymentId,
            orderId,
        }: {
            paymentId: string;
            orderId: string;
        }) => {
            const orderData = await completePayment(paymentId);
            queryClient.setQueryData(['order-detail', orderId], orderData);

            return orderData;
        },
    });
};
