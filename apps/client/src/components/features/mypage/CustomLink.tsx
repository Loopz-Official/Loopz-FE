import Link from 'next/link';

import { ChevronDownIcon } from '@/components/icons/ChevronDown';

export default function CustomLink({
    href,
    children,
}: {
    href: string;
    children: React.ReactNode;
}) {
    return (
        <Link
            href={href}
            className="text-body-02 flex items-center justify-between py-3 font-normal"
        >
            {children}
            <ChevronDownIcon className="rotate-270" />
        </Link>
    );
}
