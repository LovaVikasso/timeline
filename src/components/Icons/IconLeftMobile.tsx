import { SVGProps, Ref, forwardRef } from "react"
interface Props extends SVGProps<SVGSVGElement> {
    color?: string;
}
const SvgComponent = (
    { color = "#42567A", ...props }: Props,
    ref: Ref<SVGSVGElement>
) => (
    <svg
        width={6}
        height={8}
        viewBox="0 0 6 8"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        ref={ref}
        {...props}
    >
        <path
            d="M4.7489 1.04178L1.6239 4.16678L4.7489 7.29178"
            stroke="#42567A"
            strokeWidth={2}
        />
    </svg>
)
const ForwardRef = forwardRef(SvgComponent)
export {ForwardRef as IconLeftMobile}
