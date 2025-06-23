import { request } from '@/services/utils/instance';

import { GetObjectListRequest, GetObjectListResponse } from './type';

export const getObjectList = async (params?: GetObjectListRequest) => {
    const response = await request.get<GetObjectListResponse>('/object/v1', {
        params,
    });
    return response;
};
