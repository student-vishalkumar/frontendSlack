import { Editor } from "@/components/atoms/Editor/Editor"

export const ChatInput = () => {
    return (
        <div>
            <Editor
                placeholder="Type a message"
                onSubmit={()=> {}}
                onCancel={()=> {}}
                disabeled={false}
                defaultValue=""
            />
        </div>
    )
}