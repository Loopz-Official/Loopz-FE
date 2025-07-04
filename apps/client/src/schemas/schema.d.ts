/**
 * This file was auto-generated by openapi-typescript.
 * Do not make direct changes to the file.
 */

export interface paths {
    '/user/v1/address': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations['addressList'];
        put?: never;
        post: operations['registerAddress'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/internal/user': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations['getOrCreateUser'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/auth/v1/logout': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations['logout'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/auth/v1/login/naver': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations['naverLogin'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/auth/v1/login/kakao': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations['kakaoLogin'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/auth/v1/login/google': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post: operations['googleLogin'];
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/user/v1/terms': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations['agreeTerms'];
        trace?: never;
    };
    '/user/v1/nickname': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch: operations['updateNickName'];
        trace?: never;
    };
    '/user/v1/address/{addressId}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations['deleteAddress'];
        options?: never;
        head?: never;
        patch: operations['updateAddress'];
        trace?: never;
    };
    '/object/v1/likes/{objectId}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** 좋아요 추가/삭제 */
        patch: operations['toggleLike'];
        trace?: never;
    };
    '/object/v1/cart': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 카트 조회 */
        get: operations['getCart'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        /** 카트 수량 변경 */
        patch: operations['updateCart'];
        trace?: never;
    };
    '/user/v1/nickname/validate': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations['validateNickName'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/object/v1': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 메인보드 조회 */
        get: operations['getMainBoard'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/object/v1/{objectId}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        /** 상품 상세보기 */
        get: operations['getObjectDetails'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/internal/user/{userId}/exists': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations['existsByUserId'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/internal/objects/{objectId}/exists': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get: operations['checkObjectIdExists'];
        put?: never;
        post?: never;
        delete?: never;
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/user/v1': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        delete: operations['deleteUser'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/object/v1/cart/{objectId}': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** 개별 상품 삭제 */
        delete: operations['deleteObject'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
    '/object/v1/cart/selected': {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        get?: never;
        put?: never;
        post?: never;
        /** 선택 상품 삭제 */
        delete: operations['deleteSelected'];
        options?: never;
        head?: never;
        patch?: never;
        trace?: never;
    };
}
export type webhooks = Record<string, never>;
export interface components {
    schemas: {
        AddressRegisterRequest: {
            recipientName: string;
            phoneNumber: string;
            zoneCode: string;
            address: string;
            addressDetail: string;
            defaultAddress?: boolean;
        };
        AddressResponse: {
            /** Format: int64 */
            addressId?: number;
            userId?: string;
            recipientName?: string;
            phoneNumber?: string;
            zoneCode?: string;
            address?: string;
            addressDetail?: string;
            defaultAddress?: boolean;
        };
        UserInternalRegisterRequest: {
            email: string;
            name: string;
            givenName?: string;
            familyName?: string;
            picture?: string;
            /** @enum {string} */
            socialLoginType: 'GOOGLE' | 'KAKAO' | 'NAVER' | 'NONE';
        };
        UserInternalRegisterResponse: {
            email?: string;
            userId?: string;
            loginName?: string;
            nickName?: string;
            realName?: string;
            enabled?: boolean;
        };
        LogoutResponse: {
            message?: string;
        };
        TokenRequest: {
            accessToken?: string;
            idToken?: string;
        };
        SocialLoginResponse: {
            userId?: string;
            email?: string;
            loginName?: string;
            realName?: string;
            nickName?: string;
            enabled?: boolean;
        };
        AgreeTermsRequest: {
            over14: boolean;
            agreedServiceTerms: boolean;
            agreedMarketing: boolean;
            agreedEventSMS: boolean;
        };
        AgreeTermsResponse: {
            userId?: string;
            email?: string;
            loginName?: string;
            realName?: string;
            nickName?: string;
            enabled?: boolean;
            over14?: boolean;
            agreedServiceTerms?: boolean;
            agreedMarketing?: boolean;
            agreedEventSMS?: boolean;
        };
        NickNameUpdateRequest: {
            nickname: string;
        };
        NickNameUpdateResponse: {
            userId?: string;
            email?: string;
            loginName?: string;
            realName?: string;
            nickName?: string;
            enabled?: boolean;
        };
        AddressUpdateRequest: {
            recipientName?: string;
            phoneNumber?: string;
            zoneCode?: string;
            address?: string;
            addressDetail?: string;
            defaultAddress?: boolean;
        };
        CartUpdateRequest: {
            objectId?: string;
            /** Format: int32 */
            quantity?: number;
        };
        CartResponse: {
            /** Format: int32 */
            quantity?: number;
        };
        NickNameAvailableResponse: {
            usable?: boolean;
        };
        AddressListResponse: {
            addresses?: components['schemas']['AddressResponse'][];
        };
        FilterRequest: {
            objectTypes?: (
                | 'FURNITURE'
                | 'LIGHT'
                | 'DISPLAY'
                | 'PROPS'
                | 'FLOWERPOT'
                | 'LIFESTYLE'
                | 'ART'
            )[];
            objectSizes?: ('SMALL' | 'MEDIUM' | 'LARGE')[];
            /** Format: int32 */
            priceMin?: number;
            /** Format: int32 */
            priceMax?: number;
            keywords?: (
                | 'EMOTIONAL'
                | 'TRENDY'
                | 'RETRO'
                | 'MINIMAL'
                | 'UNIQUE'
                | 'SIMPLE'
                | 'LARGE'
                | 'PRACTICAL'
                | 'PROFOUND'
                | 'CHARMING'
            )[];
            excludeSoldOut?: boolean;
            sort?: string;
            /** Format: int32 */
            page?: number;
            /** Format: int32 */
            size?: number;
        };
        BoardResponse: {
            /** Format: int32 */
            objectCount?: number;
            objects?: components['schemas']['ObjectResponse'][];
            hasNext?: boolean;
        };
        ObjectResponse: {
            objectId?: string;
            objectName?: string;
            intro?: string;
            imageUrl?: string;
            /** Format: int64 */
            objectPrice?: number;
            soldOut?: boolean;
            liked?: boolean;
        };
        DetailResponse: {
            objectResponse?: components['schemas']['ObjectResponse'];
            size?: string;
            descriptionUrl?: string;
            productInfo?: string;
            notice?: string;
            /** Format: int32 */
            stock?: number;
            imageUrls?: string[];
        };
        CartItemResponse: {
            object?: components['schemas']['ObjectResponse'];
            /** Format: int32 */
            quantity?: number;
        };
        CartListResponse: {
            availableItems?: components['schemas']['CartItemResponse'][];
            outOfStock?: string[];
        };
    };
    responses: never;
    parameters: never;
    requestBodies: never;
    headers: never;
    pathItems: never;
}
export type $defs = Record<string, never>;
export interface operations {
    addressList: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    '*/*': components['schemas']['AddressListResponse'];
                };
            };
        };
    };
    registerAddress: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['AddressRegisterRequest'];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    '*/*': components['schemas']['AddressResponse'];
                };
            };
        };
    };
    getOrCreateUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['UserInternalRegisterRequest'];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    '*/*': components['schemas']['UserInternalRegisterResponse'];
                };
            };
        };
    };
    logout: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    '*/*': components['schemas']['LogoutResponse'];
                };
            };
        };
    };
    naverLogin: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['TokenRequest'];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    '*/*': components['schemas']['SocialLoginResponse'];
                };
            };
        };
    };
    kakaoLogin: {
        parameters: {
            query: {
                code: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    '*/*': components['schemas']['SocialLoginResponse'];
                };
            };
        };
    };
    googleLogin: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['TokenRequest'];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    '*/*': components['schemas']['SocialLoginResponse'];
                };
            };
        };
    };
    agreeTerms: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['AgreeTermsRequest'];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    '*/*': components['schemas']['AgreeTermsResponse'];
                };
            };
        };
    };
    updateNickName: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['NickNameUpdateRequest'];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    '*/*': components['schemas']['NickNameUpdateResponse'];
                };
            };
        };
    };
    deleteAddress: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                addressId: number;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    updateAddress: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                addressId: number;
            };
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['AddressUpdateRequest'];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    '*/*': components['schemas']['AddressResponse'];
                };
            };
        };
    };
    toggleLike: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                objectId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    getCart: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    '*/*': components['schemas']['CartListResponse'];
                };
            };
        };
    };
    updateCart: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': components['schemas']['CartUpdateRequest'];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    '*/*': components['schemas']['CartResponse'];
                };
            };
        };
    };
    validateNickName: {
        parameters: {
            query: {
                nickname: string;
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    '*/*': components['schemas']['NickNameAvailableResponse'];
                };
            };
        };
    };
    getMainBoard: {
        parameters: {
            query: {
                filter: components['schemas']['FilterRequest'];
            };
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    '*/*': components['schemas']['BoardResponse'];
                };
            };
        };
    };
    getObjectDetails: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                objectId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    '*/*': components['schemas']['DetailResponse'];
                };
            };
        };
    };
    existsByUserId: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                userId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    '*/*': boolean;
                };
            };
        };
    };
    checkObjectIdExists: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                objectId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content: {
                    '*/*': boolean;
                };
            };
        };
    };
    deleteUser: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteObject: {
        parameters: {
            query?: never;
            header?: never;
            path: {
                objectId: string;
            };
            cookie?: never;
        };
        requestBody?: never;
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
    deleteSelected: {
        parameters: {
            query?: never;
            header?: never;
            path?: never;
            cookie?: never;
        };
        requestBody: {
            content: {
                'application/json': string[];
            };
        };
        responses: {
            /** @description OK */
            200: {
                headers: {
                    [name: string]: unknown;
                };
                content?: never;
            };
        };
    };
}
