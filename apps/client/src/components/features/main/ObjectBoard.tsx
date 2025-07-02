'use client';

import { useEffect, useRef, useState } from 'react';
import { useInView } from 'react-intersection-observer';

import {
    ObjectBoardFilterRequest,
    ObjectBoardResponse,
} from '@/schemas/object';
import { getObjectBoardList } from '@/services/api/object';

import ProductList from './ProductList';
import ProductListToolbar from './ProductListToolbar';

export default function ObjectBoard() {
    const [objectBoardData, setObjectBoardData] =
        useState<ObjectBoardResponse>();
    const [ref, inView] = useInView();
    const pageRef = useRef(0);

    useEffect(() => {
        const fetchObjectBoardData = async () => {
            const params: ObjectBoardFilterRequest = {
                page: pageRef.current,
                size: 10,
            };
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
    }, [inView, objectBoardData]);

    return (
        <div>
            <div className="px-5">
                <h2 className="text-headline-03">Object Board</h2>
                <ProductListToolbar
                    productCount={objectBoardData?.objectCount ?? 0}
                />
            </div>
            <ProductList products={objectBoardData?.objects ?? []} />
            <div ref={ref} />
        </div>
    );
}
