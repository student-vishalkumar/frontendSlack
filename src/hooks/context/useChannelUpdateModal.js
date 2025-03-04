import ChannelUpdateContext from "@/context/ChannelUpdateContextProvider"
import { useContext } from "react"

export const useChannelUpdateModal = () => {
    return useContext(ChannelUpdateContext);
}