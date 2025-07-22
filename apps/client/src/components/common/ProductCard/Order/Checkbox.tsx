export interface ProductCardCheckboxProps {
    checked: boolean;
    onChange: () => void;
    className?: string;
}

const ProductCardCheckbox = ({
    checked,
    onChange,
    className = '',
}: ProductCardCheckboxProps) => (
    <button
        type="button"
        className={`h-4.5 w-4.5 flex items-center justify-center ${className}`}
        onClick={onChange}
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

export default ProductCardCheckbox;
