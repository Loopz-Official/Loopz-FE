import { cartInquiryResponse, cartItemUpdateResponse } from '@/schemas/cart';
import { validate } from '@/schemas/utils/validate';

import { apiClient } from '../config/axios';

export const getCartInquiry = async () => {
    try {
        const response = await apiClient.get('/object/v1/cart');

        console.log('Cart inquiry response:', response);

        if (response.status === 200) {
            return validate(cartInquiryResponse, response.data.data);
        }
    } catch (error) {
        console.error('Error fetching cart inquiry:', error);
    }
};

export const addCartItem = async (objectId: string, quantity: number) => {
    try {
        const response = await apiClient.patch('/object/v1/cart', {
            objectId,
            quantity,
        });

        if (response.status === 200) {
            return validate(cartItemUpdateResponse, response.data.data);
        }
    } catch (error) {
        console.error('Error adding cart item:', error);
    }
};
