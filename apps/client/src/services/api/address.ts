import { AddressCURequest, addressInfo, addressList } from '@/schemas/address';
import { validate } from '@/schemas/utils/validate';
import { apiClient } from '@/services/config/axios';

// 배송지 목록 조회
export const getAddressList = async () => {
    try {
        const response = await apiClient.get('/user/v1/address');

        console.log('Address List Response: ', response);

        if (response.status === 200) {
            return validate(addressList, response.data.data.addresses);
        }
    } catch (error) {
        console.error('Error fetching address list:', error);
        throw error;
    }
};

// 배송지 추가
export const createAddress = async (address: AddressCURequest) => {
    try {
        const response = await apiClient.post('/user/v1/address', address);

        console.log('Create Address Response: ', response);

        // 추후 HTTP Status code 201로 수정 요청
        if (response.status === 200) {
            return validate(addressInfo, response.data.data);
        }

        throw new Error('Failed to create address');
    } catch (error) {
        console.error('Error creating address:', error);
        throw error;
    }
};

// 배송지 수정 (Also used by checking default address)
export const updateAddress = async (
    addressId: number,
    newAddress: AddressCURequest
) => {
    try {
        const response = await apiClient.patch(
            `/user/v1/address/${addressId}`,
            newAddress
        );

        console.log('Update Address Response: ', response);

        if (response.status === 200) {
            return validate(addressInfo, response.data.data);
        }
    } catch (error) {
        console.error('Error updating address:', error);
    }
};

// 배송지 삭제
export const deleteAddress = async (addressId: number) => {
    try {
        const response = await apiClient.delete(
            `/user/v1/address/${addressId}`
        );

        console.log('Delete Address Response: ', response);

        if (response.status === 200) {
            return response.data.data;
        }
    } catch (error) {
        console.error('Error deleting address:', error);
        throw error;
    }
};
