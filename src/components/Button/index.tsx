import React, { ReactNode, ButtonHTMLAttributes } from 'react';
import * as s from "./Button.module.scss";

type Props = {
    children: ReactNode;
    variant?: 'default' | 'transparent';
} & ButtonHTMLAttributes<HTMLButtonElement>;

export const Button = ({ children, variant = 'default', ...props }: Props) => {
    const className =
        variant === 'transparent' ? s.buttonTransparent : s.button;

    return (
        <button className={className} {...props}>
            {children}
        </button>
    );
};
