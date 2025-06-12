'use client';

import 'swiper/css';
import { Swiper, SwiperSlide } from 'swiper/react';

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
    const totalSlides = 5;

    return (
        <div className="h-fit w-full">
            <Swiper
                loop
                centeredSlides={true}
                spaceBetween={6}
                className="h-fit w-full"
                breakpoints={swiperBreakpoints}
            >
                {new Array(totalSlides).fill(null).map((item, i) => (
                    <SwiperSlide key={i}>
                        <div className="relative aspect-[4/5] h-auto w-full rounded-md bg-black"></div>
                    </SwiperSlide>
                ))}
            </Swiper>
        </div>
    );
}
