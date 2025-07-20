import PortOne, { PaymentRequest } from '@portone/browser-sdk/v2';

export const portOneRequestPayment = async (paymentRequest: PaymentRequest) => {
    try {
        const response = await PortOne.requestPayment(paymentRequest);
        console.log('PortOne Payment Response: ', response);

        if (response?.code !== undefined) {
            // 결제 성공 처리
            return response;
        } else {
            // 결제 실패 처리
            throw new Error('Failed to request payment');
        }
    } catch (error) {
        console.error('Error requesting payment:', error);
        throw error;
    }
};
