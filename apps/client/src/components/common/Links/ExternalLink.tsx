import { ReactNode } from 'react';

interface ExternalLinkProps {
    href: string;
    children?: ReactNode;
    className?: string;
    icon?: ReactNode;
    showIcon?: boolean;
}

export default function ExternalLink({
    href,
    children,
    className = '',
    icon,
    showIcon = false,
}: ExternalLinkProps) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noreferrer noopener"
            className={className}
        >
            {children}
            {showIcon && !children && icon}
        </a>
    );
}
