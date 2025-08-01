import { CustomDataSchema } from '@/schemas/payment/request';

export interface PlacePaymentParams {
    orderName: string;
    totalPrice: number;
    customData: CustomDataSchema;
}
