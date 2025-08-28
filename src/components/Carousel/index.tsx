import React from 'react';
import {Swiper, SwiperSlide} from 'swiper/react';
import {Pagination} from 'swiper/modules';
import 'swiper/css';
import "./style.scss"
import 'swiper/css/pagination';
import {Card} from "@/components/Card";
import {EventInfo} from "@/types";
import {useMediaQuery} from "@/utils/useMediaQuery";

type Props = {
    cards: EventInfo[]
}
export const Carousel = ({cards}: Props) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <Swiper
            slidesPerView={3}
            spaceBetween={30}
            pagination={isMobile ? { clickable: true } : false}
            modules={[Pagination]}
        >
            {cards.map((card: EventInfo) => {
                return <SwiperSlide key={card.id}><Card card={card}/></SwiperSlide>
            })}
        </Swiper>
    );
};