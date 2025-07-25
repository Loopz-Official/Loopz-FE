import { z } from 'zod/v4';

// import { KORPhoneNumber, KORZipCode } from '../address';

import { nicePayments } from './gatewayOptions';

// Options
const BirthYearRegex = /^(19|20)\d{2}$/;
export const BirthYear = z
    .string()
    .regex(BirthYearRegex, '출생연도는 4자리 숫자여야 합니다.');

const BirthMonthRegex = /^(0[1-9]|1[0-2])$/;
export const BirthMonth = z
    .string()
    .regex(BirthMonthRegex, '올바른 월을 입력해주세요.');

const BirthDayRegex = /^(0[1-9]|[12][0-9]|3[01])$/;
export const BirthDay = z
    .string()
    .regex(BirthDayRegex, '올바른 일을 입력해주세요.');

// USED OPTION 1. 디바이스 환경에 따른 결제창 유형 설정
export const windowType = z
    .object({
        pc: z.enum(['IFRAME', 'POPUP', 'REDIRECTION', 'UI']).optional(),
        mobile: z.enum(['IFRAME', 'POPUP', 'REDIRECTION', 'UI']).optional(),
    })
    .partial();

export const callbackUrls = z.object({
    redirectUrl: z.url(), // 결제 완료 후 리다이렉트 될 URL
    appScheme: z.url(), // 앱 스킴 URL
    // noticeUrls: z.array(z.url()), // 결제 완료 후 알림 받을 URL
});

// bypass에 현재는 나이스 페이먼츠만 존재
export const paymentOptions = z
    .object({
        taxFreeAmount: z.number(),
        vatAmount: z.number(),
        customer: z
            .object({
                customerId: z.uuid(),
                fullName: z.string(), // firstName + lastName
                // phoneNumber: KORPhoneNumber,
                email: z.email(),
            })
            .partial(),
        address: z
            .object({
                country: z.enum(['KR']),
                addressLine1: z.string(), // 일반 주소
                addressLine2: z.string(), // 상세 주소
                city: z.string(),
                province: z.string(), // 시/도
            })
            .partial(),
        // zipcode: KORZipCode,
        gender: z.enum(['MALE', 'FEMALE', 'OTHER']),
        birthYear: BirthYear,
        birthMonth: BirthMonth,
        birthDay: BirthDay,
        redirectUrl: z.url(), // 결제 완료 후 리다이렉트 될 URL
        noticeUrls: z.array(z.url()),
        appScheme: z.url(),
        productType: z.enum(['PRODUCT_TYPE_REAL', 'PRODUCT_TYPE_DIGITAL']), // 결제 상품 유형
        offerPeriod: z
            .object({
                range: z
                    .object({
                        from: z.string(),
                        to: z.string(),
                    })
                    .optional(),
                interval: z
                    .string()
                    .regex(/^\d+[dmy]$/) // 3d, 6m, 1y 등만 허용
                    .optional(),
            })
            .partial(),
        products: z.array(
            z.object({
                id: z.uuid(), // 상품 아이디
                name: z.string(),
                code: z.optional(z.string()), // 상품 코드
                amount: z.number(), // 상품 가격
                quantity: z.number().positive(), // 상품 수량
                tag: z.optional(z.string()), // 상품 태그
                link: z.optional(z.url()), // 상품 링크
            })
        ),
        storeDetails: z
            .object({
                ceoFullName: z.string(),
                phoneNumber: z.string(),
                address: z.string(),
                // zipcode: KORZipCode,
                businessName: z.string(),
                businessRegistrationNumber: z.string(), // 사업자 등록번호
            })
            .partial(),
        isCulturalExpense: z.boolean(), // 문화비 지출 여부
        isEscrow: z.boolean(), // 에스크로 결제 여부
        country: z.enum(['KR']),
        promotionId: z.string(), // 프로모션 아이디
        popup: z.object({
            center: z.optional(z.boolean()),
        }), // 결제창이 팝업 방식일 경우 결제창에 적용할 속성
        bypass: z.object({
            nice_v2: nicePayments,
        }),
    })
    .partial();
