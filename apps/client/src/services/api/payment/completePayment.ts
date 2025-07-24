import { apiClient } from '@/services/config/axios';

export const completePayment = async (paymentId: string) => {
    try {
        const response = await apiClient.post(`/payment/v1/complete`, {
            paymentId,
        });

        console.log('Complete Payment Response:', response);

        if (response.status === 200) {
            return response.data;
        }
        throw new Error('Failed to complete payment');
    } catch (error) {
        console.error('Error completing payment:', error);
        throw error;
    }
};
