

import { useChannelMessageContext } from "@/hooks/context/useChannelMessageContext";
import { createContext, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext();

export const SocketContextProvider = ({children}) => {

    const [currentChannel, setCurrentChannel] = useState(null);

    const { messageList, setMessageList} = useChannelMessageContext();

    const socket = io(import.meta.env.VITE_BACKEND_SOCKET_URL);

    socket.on('newMessageRecived', (data) => {
        console.log('msrcvd',data, messageList);
        
        setMessageList([...messageList, data]);
        console.log('msglist in .on', messageList);
    })
    
    async function joinChannel(channelId) {
        
        socket.emit('joinChannel', {channelId}, (data) => {
            
            console.log('successfully joined the channel', data);
            setCurrentChannel(data?.data);
        });
    }
    return (
        <SocketContext.Provider value={{socket, joinChannel, currentChannel}}>
            {children}
        </SocketContext.Provider>
    )
}

export default SocketContext;