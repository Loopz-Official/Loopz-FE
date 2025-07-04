import * as z from 'zod/v4';

// 배송지 목록
export const addressInfo = z.object({
    addressId: z.string(),
    userId: z.string(),
    recipientName: z.string(),
    phoneNumber: z.string(),
    zoneCode: z.string(),
    address: z.string(),
    addressDetail: z.string(),
    defaultAddress: z.boolean(),
});

export type AddressInfo = z.infer<typeof addressInfo>;

export const addressList = z.array(addressInfo);

export type AddressList = z.infer<typeof addressList>;

// 배송지 추가
export const addressCURequest = addressInfo.omit({
    addressId: true,
    userId: true,
});

export type AddressCURequest = z.infer<typeof addressCURequest>;
