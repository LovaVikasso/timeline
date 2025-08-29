import React, {ButtonHTMLAttributes, ReactNode} from 'react';
import * as s from "./Button.module.scss";

type Props = {
    children: ReactNode;
    variant?: 'default' | 'transparent';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, variant = 'default', className: extraClass, ...props }: Props) => {
    const btnClass = variant === 'transparent'
        ? `${s.button} ${s.buttonTransparent}`
        : s.button;

    return (
        <button className={`${btnClass} ${extraClass ?? ''}`} {...props}>
            {children}
        </button>
    );
};
