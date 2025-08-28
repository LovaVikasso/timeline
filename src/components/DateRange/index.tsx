import React, {useRef, useState} from "react";
import gsap from "gsap";
import {useGSAP} from "@gsap/react";
import * as s from "./DateRange.module.scss";

gsap.registerPlugin(useGSAP);

type Props = {
    start: number;
    end: number;
};

export const DateRange = ({start, end}: Props) => {
    const container = useRef<HTMLDivElement>(null);
    const [displayStart, setDisplayStart] = useState(start);
    const [displayEnd, setDisplayEnd] = useState(end);

    const prevStart = useRef(start);
    const prevEnd = useRef(end);

    useGSAP(
        () => {

            const diff = Math.abs(prevStart.current - start);
            const duration = Math.min(1.2, Math.max(0.4, diff * 0.01));

            const obj = {val: prevStart.current};
            gsap.to(obj, {
                val: start,
                duration,
                ease: "none",
                roundProps: "val",
                onUpdate: () => setDisplayStart(obj.val),
                onComplete: () => {
                    prevStart.current = start;
                },
            });

            const diffEnd = Math.abs(prevEnd.current - end);
            const durationEnd = Math.min(1.2, Math.max(0.4, diffEnd * 0.1));

            const objEnd = {val: prevEnd.current};
            gsap.to(objEnd, {
                val: end,
                duration: durationEnd,
                ease: "none",
                roundProps: "val",
                onUpdate: () => setDisplayEnd(objEnd.val),
                onComplete: () => {
                    prevEnd.current = end
                },
            });
        },
        {scope: container, dependencies: [start, end]}
    );

    return (
        <div ref={container} className={s.wrapper}>
            <p className={s.start}>{displayStart}</p>
            <p className={s.end}>{displayEnd}</p>
        </div>
    );
};
