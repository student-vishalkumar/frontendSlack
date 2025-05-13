import ChannelMessageContext from "@/context/ChannelMessageContext"
import { useContext } from "react"

export const useChannelMessageContext = () => {
    return useContext(ChannelMessageContext);
}