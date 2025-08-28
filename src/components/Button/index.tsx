import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import * as s from "./Button.module.scss";

type Props = {
    children: ReactNode;
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, ...props }: Props) => {
    return (
        <button className={s.button} {...props}>
            {children}
        </button>
    );
};