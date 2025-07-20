import clsx from 'clsx';

interface HorizontalDividerProps {
    isViewportWidth?: boolean;
    height?: string;
}

const HorizontalDivider = ({
    isViewportWidth = false,
    height = '2',
}: HorizontalDividerProps) => {
    return (
        <hr
            className={clsx(
                'bg-gray-regular border-none',
                isViewportWidth ? 'w-screen max-w-2xl' : 'w-full'
            )}
            style={{
                height: `${height}px`,
            }}
        />
    );
};

export default HorizontalDivider;
