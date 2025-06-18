'use client';

import { useRouter } from 'next/navigation';

import { PlusIcon } from '@/components/icons/Plus';

export default function Page() {
    const router = useRouter();
    return (
        <div>
            <button
                onClick={() => router.push('/addresses/add')}
                className="border-gray-regular flex w-full items-center justify-center gap-1 rounded-[0.25rem] border py-3"
            >
                <PlusIcon className="h-4 w-4" />
                배송지 추가
            </button>
        </div>
    );
}
