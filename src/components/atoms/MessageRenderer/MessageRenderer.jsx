import Quill from "quill";
import { useEffect, useRef, useState } from "react"

export const MessageRenderer = ({value}) => {
    const renderedRef = useRef();
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        if(!renderedRef.content){
            return;
        }

        const quill = new Quill(document.createElement('div'), {
            theme: 'snow'
        });

        quill.disable();

        const content = JSON.parse(value);

        quill.setContents(content);

        const isContentEmpty = quill.getText().trim().length === 0;

        setIsEmpty(isContentEmpty);

        renderedRef.current.innerHTML = quill.root.innerHTML;
    },[value]);

    if(isEmpty) {
        return;
    }
    return (
        <div ref={renderedRef} className='ql-editor ql-rendere'/>
    )
}