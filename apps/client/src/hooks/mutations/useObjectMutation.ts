import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { toggleObjectLike } from '@/services/api/object';
import { handleMutationError } from '@/utils/error/handleMutationError';

export const useLikeToggleMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            objectId,
            currentLiked,
        }: {
            objectId: string;
            currentLiked: boolean;
        }) => toggleObjectLike(objectId).then(() => ({ liked: !currentLiked })),

        onSuccess: (data, variables) => {
            // object-board 쿼리 무효화 (메인 페이지)
            queryClient.invalidateQueries({ queryKey: ['object-board'] });

            // object detail 쿼리 무효화 (상세 페이지)
            queryClient.invalidateQueries({
                queryKey: ['object', variables.objectId],
            });

            // object-liked 쿼리 무효화 (좋아요 리스트 페이지)
            queryClient.invalidateQueries({ queryKey: ['object-liked'] });

            if (data.liked) {
                toast.success('좋아요한 상품에 추가되었습니다');
            } else {
                toast.success('좋아요가 취소되었습니다');
            }
        },
        onError: handleMutationError,
    });
};
