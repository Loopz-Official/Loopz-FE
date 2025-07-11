const CHANNEL_BUTTON_CLASS =
    'bg-button-gray-light border-gray-regular flex h-[3.125rem] w-full items-center justify-center rounded-sm border';

interface ChannelButtonProps {
    label: string;
    href?: string;
    onClick?: () => void;
}

export default function ChannelButton({
    label,
    href,
    onClick,
}: ChannelButtonProps) {
    if (href) {
        return (
            <a
                className={CHANNEL_BUTTON_CLASS}
                href={href}
                target="_blank"
                rel="noreferrer noopener"
            >
                {label}
            </a>
        );
    }

    return (
        <button onClick={onClick} className={CHANNEL_BUTTON_CLASS}>
            {label}
        </button>
    );
}
