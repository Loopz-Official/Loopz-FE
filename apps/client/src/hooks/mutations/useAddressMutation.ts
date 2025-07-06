import { useMutation, useQueryClient } from '@tanstack/react-query';

import { AddressCURequest } from '@/schemas/address';
import * as apiFn from '@/services/api/address';

type UpdateAddressMutationProps = {
    addressId: string;
    updatedAddress: AddressCURequest;
};

export function useCreateAddressMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: apiFn.createAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
        },
    });
}

export function useUpdateAddressMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: ({
            addressId,
            updatedAddress,
        }: UpdateAddressMutationProps) =>
            apiFn.updateAddress(addressId, updatedAddress),
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
        },
    });
}

export function useDeleteAddressMutation() {
    const queryClient = useQueryClient();

    return useMutation({
        mutationFn: apiFn.deleteAddress,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ['addresses'] });
        },
    });
}
