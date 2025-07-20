import * as z from 'zod/v4';

const KORPhoneNumberRegex = /^010-\d{4}-\d{4}$/;
export const KORPhoneNumber = z
    .string()
    .regex(KORPhoneNumberRegex, '전화번호는 010-xxxx-xxxx 형식이어야 합니다.');

const KORZipCodeRegex = /^[0-9]{5}$/;
export const KORZipCode = z
    .string()
    .regex(KORZipCodeRegex, '우편번호는 5자리 숫자여야 합니다.');

// 배송지 목록
export const addressInfo = z.object({
    addressId: z.uuid(),
    userId: z.uuid(),
    recipientName: z.string(),
    phoneNumber: KORPhoneNumber,
    zoneCode: KORZipCode,
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
