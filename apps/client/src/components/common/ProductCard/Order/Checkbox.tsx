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
        className={`mr-2 flex h-6 w-6 items-center justify-center ${className}`}
        onClick={onChange}
        aria-checked={checked}
        aria-label={checked ? '선택됨' : '선택 안 됨'}
    >
        {checked ? (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect width="24" height="24" rx="4" fill="#111" />
                <path
                    d="M7 12.5L10.5 16L17 9.5"
                    stroke="#fff"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                />
            </svg>
        ) : (
            <svg
                width="24"
                height="24"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <rect
                    x="1"
                    y="1"
                    width="22"
                    height="22"
                    rx="4"
                    stroke="#C4C4C4"
                    strokeWidth="2"
                    fill="#fff"
                />
            </svg>
        )}
    </button>
);

export default ProductCardCheckbox;
