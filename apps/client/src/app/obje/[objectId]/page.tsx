'use client';

import { usePathname } from 'next/navigation';

import ObjectDetailContent from '@/app/obje/[objectId]/ObjectDetailContent';

export default function ObjectDetailPage() {
    const pathname = usePathname();
    const objectId = pathname.split('/')[2];

    if (!objectId) {
        // objectId가 없을 때 404 페이지로 리다이렉트 (추후 구현)
        return <div>오브제 정보를 찾을 수 없습니다.</div>;
    }

    return <ObjectDetailContent objectId={objectId} />;
}
