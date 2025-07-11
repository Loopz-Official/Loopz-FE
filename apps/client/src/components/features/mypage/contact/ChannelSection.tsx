'use client';

import { CONTACT_CHANNELS, LOOPZ_EMAIL } from '@/constants/mypage';
import { openMailApp } from '@/utils/openMailApp';

import ChannelButton from './ChannelButton';

export default function ChannelSection() {
    const handleMailButtonClick = () => openMailApp(LOOPZ_EMAIL);

    return (
        <>
            <div className="text-body-02 space-y-4 font-semibold">
                {CONTACT_CHANNELS.map(({ label, href }) => (
                    <ChannelButton
                        key={label}
                        label={label}
                        href={href}
                        onClick={href ? undefined : handleMailButtonClick}
                    />
                ))}
            </div>
        </>
    );
}
