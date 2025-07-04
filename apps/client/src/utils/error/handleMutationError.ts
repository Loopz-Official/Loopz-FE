import { toast } from 'sonner';

export const handleMutationError = (error: unknown) => {
    if (error instanceof Error) {
        toast.error(error.message);
    } else {
        toast.error('알 수 없는 오류가 발생했습니다');
    }
};
