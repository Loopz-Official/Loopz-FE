interface ActionButtonItem {
    label: string;
    onClick: () => void;
    disabled?: boolean;
    type?: 'button' | 'submit' | 'reset';
}

const ActionButtonItem = ({
    label,
    onClick,
    disabled = false,
    type = 'button',
}: ActionButtonItem) => {
    return (
        <button
            className="border-gray-regular text-body-03 flex-1 rounded-md border py-2"
            onClick={onClick}
            type={type}
            disabled={disabled}
        >
            {label}
        </button>
    );
};

export default ActionButtonItem;
