import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from 'sonner';

import { GenderType } from '@/schemas/user';
import { updateMyAccountInfo } from '@/services/api/user';
import { handleMutationError } from '@/utils/error/handleMutationError';

export const useUpdateUserInfoMutation = () => {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            nickName,
            birthDate,
            gender,
        }: {
            nickName?: string;
            birthDate?: string;
            gender?: GenderType;
        }) => updateMyAccountInfo(nickName, birthDate, gender),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['user'] });
            toast.success('회원 정보가 수정되었습니다.');
        },
        onError: handleMutationError,
    });
};
