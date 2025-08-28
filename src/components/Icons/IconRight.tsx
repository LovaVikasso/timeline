import { SVGProps, Ref, forwardRef } from "react"
interface Props extends SVGProps<SVGSVGElement> {
    color?: string;
}
const SvgComponent = (
    { color = "#42567A", ...props }: Props,
    ref: Ref<SVGSVGElement>
) => (
    <svg
        width={10}
        height={14}
        viewBox="0 0 10 14"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
    >
        <path
            d="M1.50012 0.750001L7.75012 7L1.50012 13.25"
            stroke={color}
            strokeWidth={2}
        />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export {ForwardRef as IconRight}