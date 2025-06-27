import { PRE_PURCHASE_NOTICE } from '@/constants/objeDetail';

export const PurchaseNotice = () => {
    return (
        <div className="px-5 pb-8 pt-6">
            <h2 className="text-headline-04 mb-3">구매 전 꼭 읽어주세요</h2>
            <div className="text-body-03 text-gray-dark">
                <p className="mb-1">
                    본 제품은 실제 전화기능이 없는 인테리어용 모형입니다.
                </p>
                <ul className="flex flex-col gap-0.5">
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
