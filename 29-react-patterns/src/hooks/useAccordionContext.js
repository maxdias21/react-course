import {useContext} from "react";
import {AccordionContext} from "../components/Accordion/Accordion.jsx";

export default function useAccordionContext() {
    const ctx = useContext(AccordionContext);

    if (!ctx) {
        throw new Error('Accordion-related components be wrapped by <Accordion/>')
    }
    return ctx;
}