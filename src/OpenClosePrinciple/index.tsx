
import {ChevronRight} from "../components/Icon/ChevronRight.tsx";
import {ChevronLeft} from "../components/Icon/ChevronLeft.tsx";
import {ReactElement, ReactNode} from "react";
import "./index.css"
interface IncorrecButton {
    title?:string;
    iconType?:"left"|"right";
}
export const IncorrecButton = ({title,iconType}:IncorrecButton) => {
    return(
        <button className={"button"}>
            {iconType === "left" && <ChevronLeft/>}
            {iconType === "right" && <ChevronRight/>}
            {title}
        </button>
    )
}

interface CorrectButton{
    children:ReactNode,
    icon?: ({ fontSize }: { fontSize: number}) => ReactElement;
    appearance?: "large" | "small";

}
export const CorrectButton = ({children,icon, appearance="small"}:CorrectButton) => {
    const size = {
        small : 14,
        large:18
    }
    return (
        <button className={"button"}>
            {icon?.({fontSize:size[appearance]})}
            <span>
                {children}
            </span>
        </button>
    )
}