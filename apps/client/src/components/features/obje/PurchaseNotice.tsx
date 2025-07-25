import HorizontalDivider from '@/components/common/Divider/Horizontal';
import VerticalDivider from '@/components/common/Divider/Vertical';
import {
    OBJECT_CONDITION_LEVEL_GUIDE,
    PRE_PURCHASE_NOTICE,
} from '@/constants/objeDetail';

export const PurchaseNotice = () => {
    return (
        <div className="px-6 pb-8 pt-6">
            <h2 className="text-headline-04 mb-2">구매 전 꼭 읽어주세요</h2>
            <section className="text-body-03 text-gray-dark mb-6 px-1">
                <p className="mb-2.5">
                    본 제품은 전시/연출 공간에서 1차 활용된 물품입니다.
                </p>
                <ul className="flex flex-col gap-2">
                    {PRE_PURCHASE_NOTICE.map((notice, i) => (
                        <li key={i} className="flex gap-1.5">
                            <span className="h-full">﹒</span>
                            {notice}
                        </li>
                    ))}
                </ul>
            </section>
            <section className="px-1">
                <h3 className="text-body-02 text-gray-dark mb-3">
                    * 물품 상태표
                </h3>
                <ul className="text-caption-01 flex flex-col px-3">
                    {OBJECT_CONDITION_LEVEL_GUIDE.map(
                        ({ level, description }) => (
                            <li key={level}>
                                {level === '1급' && <HorizontalDivider />}
                                <div className="flex min-h-12 items-center gap-1.5">
                                    <span className="min-w-12 text-center">
                                        {level}
                                    </span>
                                    <VerticalDivider height="48" />
                                    <span className="ml-3">{description}</span>
                                </div>
                                <HorizontalDivider />
                            </li>
                        )
                    )}
                </ul>
            </section>
        </div>
    );
};

export default PurchaseNotice;
