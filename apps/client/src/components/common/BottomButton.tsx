'use client';

export default function BottomButton({
    text,
    isDisabled,
    onClick,
}: {
    text: string;
    isDisabled: boolean;
    onClick: () => void;
}) {
    return (
        <div className="fixed bottom-0 w-full bg-white px-5 py-3 shadow-[0px_-6px_20px_0px_rgba(0,0,0,0.04)]">
            <button
                disabled={isDisabled}
                onClick={onClick}
                className="text-body-03 disabled:bg-button-disabled w-full rounded-[0.25rem] bg-black py-3 font-semibold text-white"
            >
                {text}
            </button>
        </div>
    );
}
