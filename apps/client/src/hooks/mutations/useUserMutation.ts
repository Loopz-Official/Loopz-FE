import { useMutation, useQueryClient } from '@tanstack/react-query';

import { GenderType, MyAccountInfo } from '@/schemas/user';
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
        onSuccess: (data) => {
            queryClient.setQueryData(['user'], (prevData: MyAccountInfo) => {
                return { ...prevData, ...data };
            });
        },
        onError: handleMutationError,
    });
};
