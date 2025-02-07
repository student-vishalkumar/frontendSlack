
import CreateChannelContext from "@/context/createChannelContext"
import { useContext } from "react"

export const useCreateChannelModal = () => {
    return useContext(CreateChannelContext);
}