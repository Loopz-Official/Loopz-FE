import Header from '@/components/layouts/Header';

export const CONTACT_NOTIFICATIONS = [
    { label: '평일', value: '전체 문의 상담' },
    { label: '토요일, 공휴일', value: '배송 주문건 상담' },
    { label: '일요일', value: '휴무' },
];

export const CONTACT_CHANNELS = [
    { label: '카카오톡 문의하기', href: 'https://open.kakao.com/o/sfx6Rvyh' },
    { label: 'DM 문의하기', href: 'https://www.instagram.com/loop_z.official' },
    { label: '이메일 문의하기', href: '' },
];

export default function Page() {
    return (
        <>
            <Header type="title" title="1:1 문의" />

            <div className="mx-5 mt-8 space-y-4">
                <div className="text-headline-04">1:1 문의</div>

                <ul className="text-body-02 text-gray-dark list-none font-normal">
                    {CONTACT_NOTIFICATIONS.map(({ label, value }) => (
                        <li key={label}>
                            {label}: {value}
                        </li>
                    ))}
                </ul>

                <div className="text-body-02 space-y-4 font-semibold">
                    {CONTACT_CHANNELS.map(({ label, href }) =>
                        href ? (
                            <a
                                className="bg-button-gray-light border-gray-regular flex h-[3.125rem] w-full items-center justify-center rounded-sm border"
                                key={label}
                                href={href}
                                target="_blank"
                                rel="noreferrer"
                            >
                                {label}
                            </a>
                        ) : (
                            <button
                                className="bg-button-gray-light border-gray-regular flex h-[3.125rem] w-full items-center justify-center rounded-sm border"
                                key={label}
                            >
                                {label}
                            </button>
                        )
                    )}
                </div>
            </div>
        </>
    );
}
