import {useState} from "react";

import Output from "./Output";
import Async from "./Async";

export default function Greeting() {
    const [changedText, setChangedText] = useState(false);

    function changeTextHandler() {
        setChangedText(!changedText);
    }

    return (
        <>
            <h2>Hello World!</h2>
            {!changedText && <Output><p>It's good to see you!</p></Output>}
            {changedText && <Output><p>Changed!</p></Output>}

            <button onClick={changeTextHandler}>Change Text!</button>

            <Async />
        </>
    );
}