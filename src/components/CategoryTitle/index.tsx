import React from 'react';
import * as s from "./CategoryTitle.module.scss";

type Props = {
    title: string
}
export const CategoryTitle = ({title}: Props) => {
    return (
        <span className={s.title}>{title}</span>
    );
};

