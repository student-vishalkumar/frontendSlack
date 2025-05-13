import { createContext, useState } from "react";

const ChannelMessageContext = createContext();

export const ChannelMessageContextProvider = ({children}) => {
    const [messageList, setMessageList] = useState([]);
    return (
        <ChannelMessageContext.Provider value={{messageList, setMessageList}}>
            {children}
        </ChannelMessageContext.Provider>
    )
}

export default ChannelMessageContext;