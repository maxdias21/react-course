import {useContext} from "react";
import {AccordItemContext} from "../components/Accordion/AccordionItem.jsx";

export default function useAccordionItemContext() {
    const ctx = useContext(AccordItemContext);

    if(!ctx) {
        throw new Error('AccorditonItem-related components must be wrapped by <Accordion.Item> ');
    }

    return ctx;
}
