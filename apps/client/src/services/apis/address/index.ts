import { request } from '@/services/utils/instance';

import {
    CreateAddressRequest,
    CreateAddressRespose,
    DeleteAddressResponse,
    GetAddressListResponse,
} from './types';

// 배송지 목록 조회
export const getAddressList = async () => {
    const response =
        await request.get<GetAddressListResponse>('/user/v1/address');
    return response;
};

// 배송지 추가
export const createAddress = async (body: CreateAddressRequest) => {
    const response = await request.post<CreateAddressRespose>(
        '/user/v1/address',
        body
    );
    return response;
};

// 배송지 삭제
export const deleteAddress = async (addressId: number) => {
    const response = await request.delete<DeleteAddressResponse>(
        `/user/v1/address/${addressId}`
    );
    return response;
};
