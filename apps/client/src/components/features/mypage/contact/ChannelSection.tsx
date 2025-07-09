'use client';

import { CONTACT_CHANNELS } from '@/constants/mypage';

export default function ChannelSection() {
    return (
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
    );
}
