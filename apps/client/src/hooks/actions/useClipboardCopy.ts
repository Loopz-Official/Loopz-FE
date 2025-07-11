import { useState } from 'react';
import { toast } from 'sonner';

export const useClipboardCopy = (text: string, duration = 800) => {
    const [isCopied, setIsCopied] = useState<boolean>(false);

    const copy = async () => {
        try {
            if (navigator.clipboard) {
                await navigator.clipboard.writeText(text);
                setIsCopied(true);
                setTimeout(() => setIsCopied(false), duration);
            } else {
                throw new Error('클립보드 API를 지원하지 않는 브라우저입니다.');
            }
        } catch (error: unknown) {
            toast.error(
                error instanceof Error ? error.message : '복사에 실패했습니다.'
            );
        }
    };

    return { copy, isCopied };
};
