import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import * as s from "./Circle.module.scss";
import { Segment } from "@/types";
import { RadialSelector } from "@/components/RadialSelector";

type Props = {
    segments: Segment[];
    total: number;
    activeIndex: number;
    setIndex: (index: number) => void;
};

gsap.registerPlugin(useGSAP);

export const Circle = ({ segments, total, activeIndex, setIndex }: Props) => {
    const container = useRef<HTMLDivElement>(null);
    const [prevActiveIndex, setPrevActiveIndex] = useState(activeIndex);

    const radius = 265;
    const center = 265;
    const buttonSize = 56;
    const activeAngle = -Math.PI / 4;
    const step = (2 * Math.PI) / total;

    useGSAP(
        () => {
            const items = gsap.utils.toArray<HTMLDivElement>(".circle-item");

            // вычисляем общий signed сдвиг (в радианах) для всей группы:
            // rawAngleDiff в [0, 2π)
            const rawAngleDiff =
                ((activeIndex - prevActiveIndex + total) % total) * step;

            // signedAngleShift — кратчайшее смещение, с правильным знаком,
            // которое приведёт активный элемент из startAngle в targetAngle
            const signedAngleShift =
                rawAngleDiff <= Math.PI ? -rawAngleDiff : 2 * Math.PI - rawAngleDiff;

            items.forEach((el, i) => {
                const targetAngle =
                    ((i - activeIndex + total) % total) * step + activeAngle;

                const targetX =
                    Math.cos(targetAngle) * radius + center - buttonSize / 2;
                const targetY =
                    Math.sin(targetAngle) * radius + center - buttonSize / 2;

                if (activeIndex !== prevActiveIndex) {
                    // анимация перехода — остаётся по той же логике, но использует
                    // signedAngleShift (единую величину для всех элементов)
                    const startAngle =
                        ((i - prevActiveIndex + total) % total) * step + activeAngle;

                    const steps = 30;
                    const timeline = gsap.timeline();

                    for (let j = 0; j <= steps; j++) {
                        const progress = j / steps;
                        const currentAngle = startAngle + signedAngleShift * progress;

                        const x =
                            Math.cos(currentAngle) * radius +
                            center -
                            buttonSize / 2;
                        const y =
                            Math.sin(currentAngle) * radius +
                            center -
                            buttonSize / 2;

                        const speedFactor = 1.5;
                        timeline.to(el, { x, y, duration: (1 / steps) / speedFactor, ease: "sine.inOut" }, j * (1 / steps) / speedFactor);
                    }
                } else {
                    // без анимации
                    gsap.set(el, { x: targetX, y: targetY });
                }
            });

            setPrevActiveIndex(activeIndex);
        },
        { scope: container, dependencies: [activeIndex, segments] }
    );

    return (
        <div
            ref={container}
            className={s.circle}
            style={{ width: 530, height: 530, position: "relative" }}
        >
            <svg
                className={s.circleBorder}
                width={530}
                height={530}
                viewBox="0 0 530 530"
                style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    pointerEvents: "none",
                    zIndex: 1,
                }}
            >
                <circle
                    cx={265}
                    cy={265}
                    r={265}
                    stroke="#42567A20"
                    strokeWidth={1}
                    fill="none"
                />
            </svg>

            {segments.map((seg, i) => {
                const isActive = i === activeIndex;
                return (
                    <div
                        key={seg.id}
                        className="circle-item"
                        style={{
                            position: "absolute",
                            top: 0,
                            left: 0,
                            background: "transparent",
                            zIndex: isActive ? 3 : 2,
                        }}
                        onClick={() => setIndex(i)}
                    >
                        <RadialSelector
                            isActive={isActive}
                            index={i}
                            title={seg.title}
                        />
                    </div>
                );
            })}
        </div>
    );
};
