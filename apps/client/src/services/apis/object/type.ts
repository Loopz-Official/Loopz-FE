import { ApiResponse } from '@/services/utils/types';

// 오브제 보드 상품 리스트 조회 query params
export interface GetObjectListRequest {
    objectTypes: ObjectType;
    objectSizes: ObjectSize;
    priceMin: number;
    priceMax: number;
    keywords: Keyword;
    excludeSoldOut: boolean;
    sort: string;
    page: number;
    size: number;
}

export type ObjectType =
    | 'FURNITURE'
    | 'LIGHT'
    | 'DISPLAY'
    | 'PROPS'
    | 'FLOWERPOT'
    | 'LIFESTYLE'
    | 'ART';

export type ObjectSize = 'SMALL' | 'MEDIUM' | 'LARGE';

export type Keyword =
    | 'EMOTIONAL'
    | 'TRENDY'
    | 'RETRO'
    | 'MINIMAL'
    | 'UNIQUE'
    | 'SIMPLE'
    | 'LARGE'
    | 'PRACTICAL'
    | 'PROFOUND'
    | 'CHARMING';

// 오브제 보드 상품 리스트 조회 response
export type GetObjectListResponse = ApiResponse<GetObjectListDto>;

export interface GetObjectListDto {
    objectCount: number;
    objects: Object[];
    hasNext: boolean;
}

export interface Object {
    objectId: string;
    objectName: string;
    intro: string;
    imageUrl: string;
    objectPrice: number;
    soldOut: boolean;
    liked: boolean;
}
