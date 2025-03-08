import { Editor } from "@/components/atoms/Editor/Editor"

export const ChatInput = () => {

    function handleSubmit({body}) {
        console.log('body', body);
    }
    return (
        <div>
            <Editor
                placeholder="Type a message"
                onSubmit={handleSubmit}
                onCancel={()=> {}}
                disabeled={false}
                defaultValue=""
            />
        </div>
    )
}