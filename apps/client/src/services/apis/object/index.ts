import { apiClient } from '@/services/config/axios';

import { GetObjectListRequest, GetObjectListResponse } from './type';

export const getObjectList = async (params?: GetObjectListRequest) => {
    const response = await apiClient.get<GetObjectListResponse>('/object/v1', {
        params,
    });
    return response;
};
