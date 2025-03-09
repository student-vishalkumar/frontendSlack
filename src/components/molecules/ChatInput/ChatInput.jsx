import { Editor } from "@/components/atoms/Editor/Editor"
import { useAuth } from "@/hooks/context/useAuth";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useSocket } from "@/hooks/context/useSocket";

export const ChatInput = () => {

    const {socket, currentChannel} = useSocket();

    const {auth} = useAuth();
    const {currentWorkspace} = useCurrentWorkspace();

    console.log('crwid', currentWorkspace?._id);
    function handleSubmit({body}) {
        console.log('body', body);
        console.log('crwid', currentWorkspace?._id, currentChannel, socket);
        socket?.emit('newMessage',{
            channelId: currentChannel,
            body,
            senderId: auth?.user?._id,
            workspaceId: currentWorkspace?._id,
        }, (data) => {
            console.log('message Sent', data);
        })
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