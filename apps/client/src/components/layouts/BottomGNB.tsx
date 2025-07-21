'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { BOTTOM_GNB_OPTIONS } from '@/constants/bottomGNB';

export default function BottomGNB() {
    const pathname = usePathname();

    return (
        <div className="bg-gray-12 z-100 fixed bottom-0 flex h-14 w-full max-w-2xl">
            {BOTTOM_GNB_OPTIONS.map(({ label, icon: Icon, href }) => (
                <Link
                    href={href}
                    key={label}
                    className={clsx(
                        'max-w-22 m-auto flex h-full w-full flex-col items-center justify-center text-[10px] leading-[1.4] tracking-normal',
                        pathname === href ? 'text-black' : 'text-disabled'
                    )}
                >
                    <Icon />
                    {label}
                </Link>
            ))}
        </div>
    );
}
