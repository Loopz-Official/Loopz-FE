import { z } from 'zod/v4';

const afterContractOptions = z.object({
    UserCI: z.string(), // 문화상품권 결제 시 구매자 CI 정보
    MallUserID: z.string(),
    DirectCouponYN: z.enum(['Y', 'N']), // 쿠폰 자동 적용 여부
    PaycoClientId: z.string(), // 페이코 계정 자동 로그인 기능을 사용하는 경우 입력
    PaycoAccessToken: z.string(), // 페이코 계정 자동 로그인 기능을 사용하는 경우 입력
    SamsungPayType: z.enum(['01', '99']),
});

// 카드사별 호출 옵션
const CardCode = z.enum(['02', '04', '06', '07', '08', '12', '15']);
const ExposureType = z.enum(['1', '2', '3']);

const CardShowItem = z.string().refine(
    (val) => {
        const parts = val.split(':');
        if (parts.length !== 2) return false;
        const [code, type] = parts;
        return (
            CardCode.safeParse(code).success &&
            ExposureType.safeParse(type).success
        );
    },
    {
        message:
            '각 항목은 카드코드:노출유형 형식이며, 허용된 값만 사용할 수 있습니다.',
    }
);

const CardShowOption = z
    .string()
    .optional()
    .refine(
        (val) => {
            if (!val) return true; // 선택적 필드라면 허용
            return val
                .split('|')
                .every((item) => CardShowItem.safeParse(item).success);
        },
        {
            message:
                'CardShowOpt 값은 카드코드:노출유형 형식이고, | 로 구분되어야 합니다.',
        }
    );

export const nicePayments = z
    .object({
        LogoImage: z.url(),
        NPDisableScroll: z.enum(['Y', 'N']), // PC환경 결제창 스크롤 미사용 여부
        SkinType: z.enum(['red', 'green', 'purple', 'gray', 'dark']), // 결제창 테마
        DirectShowOpt: z.enum(['BANK', 'CELLPHONE']), // 단독 호출 결제 수단
        CardShowOpt: CardShowOption, // 카드사별 호출 옵션
        ...afterContractOptions.shape,
    })
    .partial();
