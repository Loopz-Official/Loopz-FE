import { FOOTER_ITEMS, FOOTER_LINKS } from '@/constants/footer';

import VerticalDivider from '../common/Divider/Vertical';

export default function Footer() {
    return (
        <div className="border-gray-light border-t-4 px-5 pb-9 pt-6">
            <div className="text-body-01 mb-3 font-semibold">
                룹즈(LOOPZ) 사업자 정보
            </div>

            <div className="text-caption-01 text-gray-regular mb-8 space-y-1.5">
                {FOOTER_ITEMS.map(({ label, value }) => (
                    <div key={label}>
                        {label}: {value}
                    </div>
                ))}
            </div>

            <div className="flex gap-3">
                {FOOTER_LINKS.map(({ label, href }, i) => {
                    const refund = label === '환불 규정';
                    const isLast = i === FOOTER_LINKS.length - 1;

                    return (
                        <div key={label} className="flex items-center gap-3">
                            <a
                                href={href}
                                target={refund ? '_self' : '_blank'}
                                rel="noreferrer"
                                className="text-body-03 text-gray-03 font-normal"
                            >
                                {label}
                            </a>
                            {!isLast && <VerticalDivider />}
                        </div>
                    );
                })}
            </div>
        </div>
    );
}
