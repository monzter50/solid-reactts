import {ReactNode} from "react";

interface IButton {
    children:ReactNode;
    color?:string;
    fontSize?:string;
}
const Button = ({children,color,fontSize="12px"}:IButton) =>{
    return(
        <button style={{color,fontSize:fontSize}}>
            {children}
        </button>
    )
}

interface  IRedIncorrectButton{
    children:ReactNode;
    isBig?:boolean;
}
export const RedIncorrectButton = ({children, isBig=false}:IRedIncorrectButton)=>{
    const size = isBig? "20px":"12px";
    return(
        <Button color={"red"} fontSize={size}>
            {children}
        </Button>
    )
}

export const RedCorrectButton = ({children,fontSize="12px"}:IButton) => {
    return (
        <Button color={"red"} fontSize={fontSize}>
            {children}
        </Button>
    )
}