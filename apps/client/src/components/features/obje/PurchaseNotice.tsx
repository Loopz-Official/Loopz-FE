import { PRE_PURCHASE_NOTICE } from '@/constants/objeDetail';

export const PurchaseNotice = () => {
    return (
        <div className="px-5 pb-8 pt-6">
            <h2 className="text-headline-04 mb-3">구매 전 꼭 읽어주세요</h2>
            <div className="text-body-03 text-gray-dark font-normal">
                <p className="mb-2">
                    본 제품은 전시/연출 공간에서 1차 활용된 물품입니다.
                </p>
                <ul className="flex flex-col gap-1">
                    {PRE_PURCHASE_NOTICE.map((notice, i) => (
                        <li key={i} className="flex gap-1">
                            <span className="h-full">﹒</span>
                            {notice}
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

export default PurchaseNotice;
