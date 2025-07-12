import { Metadata } from 'next';

import ObjectDetailContent from '@/app/obje/[objectId]/ObjectDetailContent';
import { getObjectDetail } from '@/services/api/object';

export async function generateMetadata({
    params,
}: {
    params: { objectId: string };
}): Promise<Metadata> {
    const objeInfo = await getObjectDetail(params.objectId);

    if (!objeInfo) {
        return {
            title: '오브제를 찾을 수 없습니다',
            description: '요청하신 오브제 정보를 찾을 수 없습니다.',
        };
    }

    const title = objeInfo.objectName;
    const description = objeInfo.intro;

    return {
        title,
        description,
        openGraph: {
            title,
            description,
            images: [
                {
                    url: objeInfo.imageUrl,
                    width: 800,
                    height: 600,
                    alt: title,
                },
            ],
            locale: 'ko_KR',
            type: 'website',
        },
        twitter: {
            title,
            description,
            images: {
                url: objeInfo.imageUrl,
            },
        },
    };
}

export default function ObjectDetailPage({
    params,
}: {
    params: { objectId: string };
}) {
    if (!params.objectId) {
        return <div>오브제 정보를 찾을 수 없습니다.</div>;
    }

    return <ObjectDetailContent objectId={params.objectId} />;
}
