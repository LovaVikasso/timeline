import React from 'react';
import * as s from "./TimelinePagination.module.scss"
import {Button} from "@/components/Button";
import {IconLeft, IconLeftMobile, IconRight, IconRightMobile} from "@/components/Icons";
import {useMediaQuery} from "@/utils/useMediaQuery";

type Props = {
    activeIndex: number
    total: number
    next: ()=> void
    prev: ()=> void
}
export const TimelinePagination = ({activeIndex, total, next, prev}: Props) => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    const formatNumber = (num: number) => String(num).padStart(2, "0");
    const prevDisabled = activeIndex === 0;
    const nextDisabled = (activeIndex + 1) === total;
    return (
        <div className={s.wrapper}>
            <p className={s.segments}>{formatNumber(activeIndex+1)}/{formatNumber(total)}</p>
            <div className={s.controls}>
                <Button onClick={prev} disabled={prevDisabled}>{isMobile ? <IconLeftMobile/> : <IconLeft/>}</Button>
                <Button onClick={next} disabled={nextDisabled}>{isMobile ? <IconRightMobile/> : <IconRight/>}</Button>
            </div>
        </div>
    );
};

