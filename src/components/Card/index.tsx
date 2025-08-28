import React from 'react';
import * as s from "./Card.module.scss"
import {EventInfo} from "@/types";

type Props = {
    card: EventInfo
}
export const Card = ({card}: Props) => {
    const {year, text} = card
    return (
        <div className={s.wrapper}>
            <p className={s.date}>{year}</p>
            <p className={s.content}>{text}</p>
        </div>
    );
};
