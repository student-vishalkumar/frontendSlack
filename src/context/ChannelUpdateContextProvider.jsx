import { createContext, useState } from "react";
const ChannelUpdateContext = createContext();

export const ChannelUpdateContextProvider = ({children}) => {

    const [openModal, setOpenModal] = useState(false);

    const [initialValue, setInitialValue] = useState("Edit Channel");

    const [channel, setChannel] = useState(null);

    <ChannelUpdateContext.Provider value={{openModal, setOpenModal, initialValue, setInitialValue, channel, setChannel}}>
        {children}
    </ChannelUpdateContext.Provider>
}

export default ChannelUpdateContext;