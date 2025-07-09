'use client';

import { useState } from 'react';

import { CONTACT_CHANNELS } from '@/constants/mypage';

const LOOPZ_EMAIL = 'loopstory08@gmail.com';

export default function ChannelSection() {
    const [isCopied, setIsCopied] = useState(false);

    const className =
        'bg-button-gray-light border-gray-regular flex h-[3.125rem] w-full items-center justify-center rounded-sm border';

    const handleCopyButtonClick = async () => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(LOOPZ_EMAIL);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), 1000);
            }
        } catch (error) {
            console.error('이메일 복사 실패:', error);
            alert(`이메일 복사에 실패했습니다.\n${LOOPZ_EMAIL}`);
        }
    };

    return (
        <>
            <div className="text-body-02 space-y-4 font-semibold">
                {CONTACT_CHANNELS.map(({ label, href }) =>
                    href ? (
                        <a
                            className={className}
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noreferrer"
                        >
                            {label}
                        </a>
                    ) : (
                        <button
                            onClick={handleCopyButtonClick}
                            className={className}
                            key={label}
                        >
                            {label}
                        </button>
                    )
                )}
            </div>
            {isCopied && (
                <div className="text-caption-01 max-w-3xs -translate-1/2 fixed left-1/2 top-1/2 mx-auto rounded-md bg-black/80 px-4 py-3 text-center text-white">
                    이메일이 복사되었습니다.
                </div>
            )}
        </>
    );
}
