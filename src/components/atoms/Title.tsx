import type {ReactNode} from "react";

function Title(
    {
        children,
    }:{
        children: ReactNode
    }
) {
    return (
        <p
            className="text-3xl font-bold text-center"
        >
            {children}
        </p>
    )
}

export default Title;