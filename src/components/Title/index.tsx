import React from 'react';
import * as s from "./Title.module.scss"
import {useMediaQuery} from "@/utils/useMediaQuery";
export const Title = () => {
    const isMobile = useMediaQuery('(max-width: 768px)');
    return (
        <div className={s.wrapper} >
            {!isMobile && <span className={s.line}/>}
            <p className={s.text}>Исторические
                даты</p>
        </div>
    );
};

