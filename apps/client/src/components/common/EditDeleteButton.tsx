type EditDeleteButtonProps = {
    type: 'edit' | 'delete';
    onClick: () => void;
};

const EditDeleteButton = ({ type, onClick }: EditDeleteButtonProps) => {
    return (
        <button
            onClick={onClick}
            className="border-gray-regular rounded-xs text-caption-01 border px-4 py-1"
        >
            {type === 'edit' ? '수정' : '삭제'}
        </button>
    );
};

export default EditDeleteButton;
