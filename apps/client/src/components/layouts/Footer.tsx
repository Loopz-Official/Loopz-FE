import { FOOTER_ITEMS, FOOTER_LINKS } from '@/constants/footer';

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

            <div className="flex">
                {FOOTER_LINKS.map(({ label, href }, i) => (
                    <div key={label} className="flex items-center">
                        <a href={href} target="_blank" rel="noreferrer">
                            {label}
                        </a>
                        {i !== FOOTER_LINKS.length - 1 && (
                            <div className="mx-3 h-3 w-px bg-[#e5e5ec]" />
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
}
