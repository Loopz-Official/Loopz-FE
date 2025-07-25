import clsx from 'clsx';

const colorClasses = {
    'gray-regular': 'bg-gray-regular',
    'gray-light': 'bg-gray-light',
} as const;

type ColorKey = keyof typeof colorClasses;

interface HorizontalDividerProps {
    color?: ColorKey;
    isViewportWidth?: boolean;
    height?: string;
    margin?: string;
}

const HorizontalDivider = ({
    color = 'gray-regular',
    isViewportWidth = false,
    height = '2',
    margin = 'm-0',
}: HorizontalDividerProps) => {
    return (
        <hr
            className={clsx(
                'border-none',
                colorClasses[color],
                margin,
                isViewportWidth ? 'w-screen max-w-2xl' : 'w-full'
            )}
            style={{
                height: `${height}px`,
            }}
        />
    );
};

export default HorizontalDivider;
