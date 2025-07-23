type ClipboardCopyToastProps = {
    isCopied: boolean;
    message?: string;
};

export function ClipboardCopyToast({
    isCopied,
    message = '복사되었습니다.',
}: ClipboardCopyToastProps) {
    if (!isCopied) return null;

    return (
        <div className="text-caption-01 max-w-3xs -translate-1/2 fixed left-1/2 top-1/2 z-50 mx-auto rounded-md bg-black/80 px-4 py-3 text-center text-white">
            {message}
        </div>
    );
}
