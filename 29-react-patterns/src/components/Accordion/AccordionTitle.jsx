import useAccordionContext from "../../hooks/useAccordionContext.js";
import useAccordionItemContext from "../../hooks/useAccorditonItemContext.js";

export default function AccordionTitle({children, className}) {
    const {toggleItem} = useAccordionContext()

    const id = useAccordionItemContext();

    return  <h3 className={className} onClick={() => toggleItem(id)}>{children}</h3>;
}