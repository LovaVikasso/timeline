import React, { useState, useRef } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/pagination';
import './style.scss';
import { Card } from '@/components/Card';
import { EventInfo } from '@/types';
import { useMediaQuery } from '@/utils/useMediaQuery';
import { Button } from '@/components/Button';
import { IconLeft, IconRight } from '@/components/Icons';

type Props = {
    cards: EventInfo[];
};

export const Carousel = ({ cards }: Props) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const [activeIndex, setActiveIndex] = useState(0);
    const swiperRef = useRef<any>(null);

    return (
        <div className="carousel-container">
            {!isMobile && activeIndex > 0 && (
                <Button
                    variant="transparent"
                    className="carousel-button left"
                    onClick={() => swiperRef.current?.slidePrev()}
                >
                    <IconLeft color="#3877EE" />
                </Button>
            )}

            <Swiper
                slidesPerView={3}
                spaceBetween={80}
                breakpoints={{
                    0: {
                        slidesPerView: 2,
                        spaceBetween: 25,
                    },
                    769: {
                        slidesPerView: 3,
                        spaceBetween: 80,
                    },
                }}
                a11y={{ enabled: true }}
                onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
                onSwiper={(swiper) => (swiperRef.current = swiper)}
                pagination={isMobile ? { clickable: true } : false}
                modules={[Pagination]}
                className="swiper"
            >
                {cards.map((card: EventInfo) => (
                    <SwiperSlide key={card.id}>
                        <Card card={card} />
                    </SwiperSlide>
                ))}
            </Swiper>
            {!isMobile && activeIndex < cards.length - 3 && (
                <Button
                    variant="transparent"
                    className="carousel-button right"
                    onClick={() => swiperRef.current?.slideNext()}
                >
                    <IconRight color="#3877EE" />
                </Button>
            )}
        </div>
    );
};
