export interface CheckBoxProps {
    checked: boolean;
    onChange: () => void;
    variant?: 'default' | 'product-card';
    size?: 'sm' | 'md';
    className?: string;
    disabled?: boolean;
}

const CheckBox = ({
    checked,
    onChange,
    variant = 'default',
    size = 'sm',
    className = '',
    disabled = false,
}: CheckBoxProps) => {
    const sizeClasses = {
        sm: 'h-4 w-4',
        md: 'h-4.5 w-4.5',
    };

    if (variant === 'product-card') {
        return (
            <button
                type="button"
                className={`${sizeClasses[size]} flex items-center justify-center ${className}`}
                onClick={onChange}
                disabled={disabled}
                aria-checked={checked}
                aria-label={checked ? 'checked' : 'unchecked'}
            >
                {checked ? (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <rect width="20" height="20" rx="4" fill="#151515" />
                        <path
                            d="M5 10.1111L8.57143 14L15 7"
                            stroke="white"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                ) : (
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 20 20"
                        fill="none"
                    >
                        <rect
                            x="0.5"
                            y="0.5"
                            width="19"
                            height="19"
                            rx="4"
                            stroke="#CCCCCC"
                        />
                        <path
                            d="M5 10.1111L8.57143 14L15 7"
                            stroke="#CCCCCC"
                            strokeWidth="1.5"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                        />
                    </svg>
                )}
            </button>
        );
    }

    return (
        <input
            type="checkbox"
            checked={checked}
            onChange={onChange}
            disabled={disabled}
            className={`border-gray-09 not-checked:bg-[url('/checkbox/unchecked.svg')] rounded-xs relative ${sizeClasses[size]} appearance-none border bg-center bg-no-repeat checked:border-black checked:bg-black checked:bg-[url('/checkbox/checked.svg')] ${className}`}
        />
    );
};

export default CheckBox;
