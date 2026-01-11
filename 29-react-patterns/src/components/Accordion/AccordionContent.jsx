import useAccordionContext from "../../hooks/useAccordionContext.js";
import useAccordionItemContext from "../../hooks/useAccorditonItemContext.js";

export default function AccordionContent({className, children}) {
    const {openItemId} = useAccordionContext();
    const id = useAccordionItemContext();

    const isOpen = openItemId === id;

    return (
        <div
            className={isOpen ? `${className ?? ''} open` : `${className ?? ''} close`}>
            {children}
        </div>
    );
}