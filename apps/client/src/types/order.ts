import { PortOneOrderStatus } from '@/schemas/payment/enum';

export type PaymentStatus = {
    status: PortOneOrderStatus;
    message: string;
};
