'use client';

import { useEffect, useRef, useState } from 'react';
import clsx from 'clsx';
import 'swiper/css';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import { calculatePeekWidth } from '@/utils/calculatePeekWidth';

const swiperBreakpoints = {
    0: {
        slidesPerView: 1.1,
    },
    376: {
        slidesPerView: 1.2,
    },
    461: {
        slidesPerView: 1.3,
    },
    481: {
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
    const totalSlides = 5;
    const swiperRef = useRef<HTMLDivElement>(null);
    const slideRef = useRef<HTMLDivElement>(null);

    // slide 기준으로 페이지네이션 위치 설정
    const calculatePaginationPosition = () => {
        if (!swiperRef?.current || !slideRef?.current) return;
        const peekWidth = calculatePeekWidth(
            slideRef as React.RefObject<HTMLDivElement>
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
                pagination={{
                    el: '.banner-swiper-pagination',
                    type: 'custom',
                    renderCustom: (_, current, total) => {
                        if (isSwiping) {
                            return `<span class="current">${prevCurrent}</span><span class="total">/ ${total}</span>`;
                        }
                        setPrevCurrent(current);
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
                {new Array(totalSlides).fill(null).map((item, i) => (
                    // TODO: 타이틀 및 설명을 active 슬라이드에만 보이게 할지
                    <SwiperSlide key={i}>
                        {({ isActive }) => (
                            <div
                                ref={i === 0 ? slideRef : undefined}
                                className="bg-gray-regular relative flex aspect-[4/5] h-auto w-full flex-col justify-end gap-2 rounded-md px-5 py-8 before:absolute before:inset-0 before:rounded-md before:bg-gradient-to-b before:from-transparent before:from-[40.97%] before:to-black/40 before:to-[99.92%]"
                            >
                                <div
                                    className={clsx(
                                        'pointer-events-none transition-colors',
                                        isActive
                                            ? 'text-white'
                                            : 'text-white/40'
                                    )}
                                >
                                    <h3 className="text-headline-02 relative z-10 whitespace-pre">{`기억을 담은 물건들,\n다시 꺼냅니다`}</h3>
                                    <div className="text-body-03 relative z-10 font-normal">
                                        무드에 맞는 빈티지 오브제를 제안합니다
                                    </div>
                                </div>
                            </div>
                        )}
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
