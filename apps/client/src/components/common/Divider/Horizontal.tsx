import clsx from 'clsx';

interface HorizontalDividerProps {
    color?: string;
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
                `border-none bg-${color} ${margin}`,
                isViewportWidth ? 'w-screen max-w-2xl' : 'w-full'
            )}
            style={{
                height: `${height}px`,
            }}
        />
    );
};

export default HorizontalDivider;
