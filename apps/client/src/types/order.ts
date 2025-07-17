import { PortOneOrderStatus } from '@/schemas/payment/enum';

export interface PaymentStatus {
    status: PortOneOrderStatus;
    message: string;
}
