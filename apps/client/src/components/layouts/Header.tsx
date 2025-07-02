'use client';

import { useRouter } from 'next/navigation';
import clsx from 'clsx';

import { LEFT_SIDE_OPTIONS, RIGHT_SIDE_OPTIONS } from '@/constants/header';

import CartCount from '../features/cart/CartCount';

export type HeaderType = 'main' | 'sub' | 'title' | 'pop-up';

export default function Header({
    type,
    title,
    redirectUrl,
}: {
    type: HeaderType;
    title?: string;
    redirectUrl?: string;
}) {
    const currentOption = LEFT_SIDE_OPTIONS[type];
    const router = useRouter();

    const handleLeftOptionClick = () => {
        if (type === 'main') {
            router.push('/main');
        } else if (type === 'pop-up') {
            router.push(redirectUrl || '/');
        } else {
            router.back();
        }
    };

    return (
        <div
            className={`sticky top-0 z-10 grid h-14 w-full grid-cols-[1fr_auto_1fr] bg-white py-[0.875rem] ${type !== 'pop-up' ? 'px-5' : ''}`}
        >
            <div>
                <button
                    onClick={handleLeftOptionClick}
                    className="flex items-center gap-1"
                    aria-label={currentOption.label}
                >
                    <currentOption.icon className={currentOption.className} />
                </button>
            </div>
            <div className="text-headline-04">{title}</div>
            <div className="flex gap-4 place-self-end">
                {(type === 'main' || type === 'sub') && (
                    <>
                        {RIGHT_SIDE_OPTIONS.map(
                            ({ label, icon: Icon, route }) => (
                                <button
                                    key={label}
                                    className={clsx(
                                        'flex items-center gap-1',
                                        label === '장바구니' && 'relative'
                                    )}
                                    aria-label={label}
                                    onClick={() => router.push(route)}
                                >
                                    <Icon className="h-7 w-7" />
                                    {label === '장바구니' && (
                                        <CartCount count={2} />
                                    )}
                                </button>
                            )
                        )}
                    </>
                )}
            </div>
        </div>
    );
}
