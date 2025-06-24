'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import 'swiper/css';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import Link from 'next/link';

import { calculatePeekWidth } from '@/utils/calculatePeekWidth';
import { MOCK_BANNER } from '@/constants/mockBanner';

const swiperBreakpoints = {
    0: {
        slidesPerView: 1.1,
    },
    460: {
        slidesPerView: 1.2,
    },
    480: {
        slidesPerView: 1.3,
    },
    512: {
        slidesPerView: 1.5,
    },
    600: {
        slidesPerView: 1.8,
    },
};

export default function Banner() {
    const [paginationStyle, setPaginationStyle] = useState({});
    const [isSwiping, setIsSwiping] = useState(false);
    const [prevCurrent, setPrevCurrent] = useState(1);
    const swiperRef = useRef<HTMLDivElement>(null);
    const slideRef = useRef<HTMLAnchorElement>(null);

    // slide 기준으로 페이지네이션 위치 설정
    const calculatePaginationPosition = () => {
        if (!swiperRef?.current || !slideRef?.current) return;
        const peekWidth = calculatePeekWidth(
            slideRef as React.RefObject<HTMLAnchorElement>
        );

        setPaginationStyle({
            position: 'absolute',
            top: `16px`,
            right: `${peekWidth + 22}px`,
        });
    };

    useEffect(() => {
        calculatePaginationPosition();
        window.addEventListener('resize', calculatePaginationPosition);
        return () =>
            window.removeEventListener('resize', calculatePaginationPosition);
    }, []);

    return (
        // TODO: 드래그 시 이전 슬라이드가 먼저 사라지는 문제 해결
        <div className="relative h-fit w-full" ref={swiperRef}>
            <Swiper
                loop
                centeredSlides={true}
                spaceBetween={6}
                className="h-fit w-full"
                breakpoints={swiperBreakpoints}
                modules={[Autoplay, Pagination]}
                autoplay={{ delay: 5000 }}
                onTouchStart={() => setIsSwiping(true)}
                onTouchEnd={() => setIsSwiping(false)}
                onActiveIndexChange={(swiper) => {
                    if (isSwiping) return;
                    setPrevCurrent(swiper.realIndex + 1);
                }}
                pagination={{
                    el: '.banner-swiper-pagination',
                    type: 'custom',
                    renderCustom: (_, current, total) => {
                        if (isSwiping) {
                            return `<span class="current">${prevCurrent}</span><span class="total">/ ${total}</span>`;
                        }
                        return `<span class="current">${current}</span><span class="total">/ ${total}</span>`;
                    },
                }}
            >
                {/* 페이지네이션 */}
                <div
                    className="banner-swiper-pagination text-caption-01 pointer-events-none z-10 flex h-7 items-center justify-end gap-0.5 rounded-full bg-black/20 px-3 backdrop-blur-[7px] [&_.current]:min-w-2 [&_.current]:font-medium [&_.current]:text-white [&_.total]:font-normal [&_.total]:text-white/60"
                    style={paginationStyle}
                ></div>

                {/* 배너 슬라이드 */}
                {MOCK_BANNER.map((item, i) => (
                    <SwiperSlide key={item.imageUrl}>
                        {({ isActive }) => (
                            <Link
                                target="_blank"
                                href={item.embeddedUrl}
                                ref={i === 0 ? slideRef : undefined}
                                className="bg-gray-regular relative flex aspect-[4/5] h-auto w-full flex-col items-start justify-end gap-2 rounded-md bg-cover bg-no-repeat px-5 py-8 text-left before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-b before:from-transparent before:from-[40.97%] before:to-black/40 before:to-[99.92%]"
                                style={{
                                    backgroundImage: `url(${item.imageUrl})`,
                                }}
                            >
                                <div
                                    className={clsx(
                                        'pointer-events-none transition-colors',
                                        isActive
                                            ? 'text-white'
                                            : 'text-white/40'
                                    )}
                                >
                                    <h3 className="text-headline-02 relative z-10 whitespace-pre">
                                        {item.title}
                                    </h3>
                                    <div className="text-body-03 relative z-10 font-normal">
                                        {item.description}
                                    </div>
                                </div>
                            </Link>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
