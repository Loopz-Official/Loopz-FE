import { ApiResponse } from '@/services/utils/types';

// 배송지 목록 조회 response
export type GetAddressListResponse = ApiResponse<GetAddressListDto>;

export interface GetAddressListDto {
    addresses: Address[];
}

export interface Address {
    addressId: number;
    userId: string;
    recipientName: string;
    phoneNumber: string;
    zoneCode: string;
    address: string;
    addressDetail: string;
    defaultAddress: boolean;
}

// 배송지 추가 request body
export interface CreateAddressRequest {
    recipientName: string;
    phoneNumber: string;
    zoneCode: string;
    address: string;
    addressDetail: string;
    defaultAddress: boolean;
}

// 배송지 추가 response
export type CreateAddressRespose = ApiResponse<CreateAddressDto>;

export type CreateAddressDto = Address;

// 배송지 삭제 response
export type DeleteAddressResponse = ApiResponse<null>;
