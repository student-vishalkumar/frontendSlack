import Quill from "quill";
import { useEffect, useRef, useState } from "react"

export const MessageRenderer = ({value}) => {
    const renderedRef = useRef();
    const [isEmpty, setIsEmpty] = useState(false);

    console.log('value body', value);
    useEffect(() => {
        
        if(!renderedRef.current){
            return;
        }

        
        const quill = new Quill(document.createElement('div'), {
            theme: 'snow'
        });

        console.log('3');
        quill.disable();

        const content = JSON.parse(value);

        console.log('content', content);
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