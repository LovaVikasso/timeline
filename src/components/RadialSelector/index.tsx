import React from "react";
import * as s from "./RadialSelector.module.scss";
import {useHoverState} from "@/utils/useHoverState";
import {CategoryTitle} from "@/components/CategoryTitle";

type Props = {
    isActive: boolean;
    index: number;
    title?: string;
    onClick?: () => void;
};

export const RadialSelector = ({isActive, index, title, onClick}: Props) => {
    const {isHovered, onMouseEnter, onMouseLeave} = useHoverState();
    const showActiveState = isActive || isHovered;

    return (
        <div
            className={s.wrapper}
            onMouseEnter={onMouseEnter}
            onMouseLeave={onMouseLeave}
            onClick={onClick}
        >
            <div className={s.content}>
                <button
                    className={`${s.circle} ${showActiveState ? s.active : ""}`}
                >
                    <span className={s.indexText}>{index + 1}</span>
                </button>

            </div>
            {isActive && title && <CategoryTitle title={title}/>}
        </div>
    );
};
