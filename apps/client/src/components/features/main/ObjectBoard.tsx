'use client';

import { useSearchParams } from 'next/navigation';
import { Suspense, useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import SuspenseWrapper from '@/components/common/SuspenseWrapper';
import {
    objectBoardFilterRequest,
    ObjectBoardResponse,
} from '@/schemas/object';
import { validate } from '@/schemas/utils/validate';
import { getObjectBoardList } from '@/services/api/object';

import ProductList from './ProductList';
import ProductListToolbar from './ProductListToolbar';

export default function ObjectBoard() {
    const [objectBoardData, setObjectBoardData] =
        useState<ObjectBoardResponse>();
    const [ref, inView] = useInView();
    const pageRef = useRef(0);
    const searchParams = useSearchParams();

    useEffect(() => {
        const fetchObjectBoardData = async () => {
            const filterSearchParams: Record<string, string> = {};
            searchParams.forEach(
                (value, key) => (filterSearchParams[key] = value)
            );

            const params = validate(
                objectBoardFilterRequest,
                {
                    page: pageRef.current,
                    size: 10,
                    ...filterSearchParams,
                },
                'Object Board Filter Request'
            );

            const response = await getObjectBoardList(params);

            if (response) {
                setObjectBoardData({
                    ...response,
                    objects: [
                        ...(objectBoardData ? objectBoardData.objects : []),
                        ...response.objects,
                    ],
                });
                pageRef.current += 1;
            }
        };

        if (!objectBoardData || (inView && objectBoardData.hasNext)) {
            fetchObjectBoardData();
        }
    }, [inView, objectBoardData, searchParams]);

    return (
        <SuspenseWrapper>
            <div>
                <div className="px-5">
                    <h2 className="text-headline-03">Object Board</h2>
                    <Suspense>
                        <ProductListToolbar
                            productCount={objectBoardData?.objectCount ?? 0}
                        />
                    </Suspense>
                </div>
                <ProductList products={objectBoardData?.objects ?? []} />
                <div ref={ref} />
            </div>
        </SuspenseWrapper>
    );
}
