import { useContext } from "react"
import CreateWorkspaceContext from "@/context/createWorkspaceContext"


export const useCreateWorkspaceModal = () => {
    return useContext(CreateWorkspaceContext);
}
