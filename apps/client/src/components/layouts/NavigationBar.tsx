'use client';

import clsx from 'clsx';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

import { NAVIGATION_BAR_OPTIONS } from '@/constants/navigationBar';

export default function NavigationBar() {
    const pathname = usePathname();

    return (
        <div className="bg-gray-12 fixed bottom-0 z-10 grid h-14 w-full max-w-2xl grid-cols-5">
            {NAVIGATION_BAR_OPTIONS.map(({ label, icon: Icon, href }) => (
                <Link
                    href={href}
                    key={label}
                    className={clsx(
                        'max-w-22 m-auto flex h-full w-full flex-col items-center justify-center text-[10px] leading-[1.4]',
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
