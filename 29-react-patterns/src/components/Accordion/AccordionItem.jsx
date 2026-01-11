import {createContext, useContext} from "react";

export const AccordItemContext = createContext();


export default function AccordionItem({id, className, children}) {
    return (
        <AccordItemContext.Provider value={id}>
            <li className={className}>
                {children}
            </li>
        </AccordItemContext.Provider>
    );
}