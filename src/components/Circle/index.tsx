import React, { useRef, useState } from "react";
import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import * as s from "./Circle.module.scss";
import { Segment } from "@/types";
import {RadialSelector} from "@/components/RadialSelector";

type Props = {
    segments: Segment[];
    total: number
};

gsap.registerPlugin(useGSAP);

export const Circle = ({ segments, total }: Props) => {
    const container = useRef<HTMLDivElement>(null);
    const [activeIndex, setActiveIndex] = useState(0);
    const [prevActiveIndex, setPrevActiveIndex] = useState(0);

    const radius = 265;
    const center = 265;
    const buttonSize = 56;
    const activeAngle = -Math.PI / 4;

    useGSAP(
        () => {
            const items = gsap.utils.toArray<HTMLDivElement>(".circle-item");

            items.forEach((el, i) => {
                // Рассчитываем целевой угол для каждого элемента
                const targetAngle =
                    ((i - activeIndex + segments.length) % segments.length) *
                    (2 * Math.PI / segments.length) +
                    activeAngle;

                // Рассчитываем целевую позицию на окружности
                const targetX = Math.cos(targetAngle) * radius + center - buttonSize / 2;
                const targetY = Math.sin(targetAngle) * radius + center - buttonSize / 2;

                if (activeIndex !== prevActiveIndex) {
                    // Если это анимация перехода, анимируем движение по дуге

                    // Рассчитываем начальный угол
                    const startAngle =
                        ((i - prevActiveIndex + segments.length) % segments.length) *
                        (2 * Math.PI / segments.length) +
                        activeAngle;

                    // Создаем анимацию движения по дуге
                    const steps = 30; // количество шагов для плавной дуги
                    const points = [];

                    // Вычисляем направление движения (по часовой или против)
                    const angleDiff = ((activeIndex - prevActiveIndex + segments.length) % segments.length) *
                        (2 * Math.PI / segments.length);
                    const direction = angleDiff > Math.PI ? -1 : 1;

                    // Создаем точки для движения по дуге
                    for (let j = 0; j <= steps; j++) {
                        const progress = j / steps;
                        const currentAngle = startAngle + angleDiff * progress * direction;

                        const x = Math.cos(currentAngle) * radius + center - buttonSize / 2;
                        const y = Math.sin(currentAngle) * radius + center - buttonSize / 2;

                        points.push({ x, y });
                    }

                    // Анимируем движение по точкам дуги
                    const timeline = gsap.timeline();

                    points.forEach((point, index) => {
                        timeline.to(el, {
                            x: point.x,
                            y: point.y,
                            duration: 1 / steps,
                            ease: "sine.inOut"
                        }, index * (1 / steps));
                    });
                } else {
                    // Просто устанавливаем позицию без анимации
                    gsap.set(el, {
                        x: targetX,
                        y: targetY
                    });
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
                    zIndex: 1
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
                        onClick={() => setActiveIndex(i)}
                    >
                        <RadialSelector isActive={isActive} index={i} title={seg.title} />
                    </div>
                );
            })}
        </div>
    );
};