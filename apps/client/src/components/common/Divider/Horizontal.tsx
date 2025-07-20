import clsx from 'clsx';

interface HorizontalDividerProps {
    lightColor?: boolean;
    isViewportWidth?: boolean;
    height?: string;
}

const HorizontalDivider = ({
    lightColor = false,
    isViewportWidth = false,
    height = '2',
}: HorizontalDividerProps) => {
    return (
        <hr
            className={clsx(
                'border-none',
                isViewportWidth ? 'w-screen max-w-2xl' : 'w-full',
                lightColor ? 'bg-gray-light' : 'bg-gray-regular'
            )}
            style={{
                height: `${height}px`,
            }}
        />
    );
};

export default HorizontalDivider;
