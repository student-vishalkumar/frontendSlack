import WorkspacePreferenceModalContext from "@/context/WorkspacePreferenceModalContext"
import { useContext } from "react"

export const useWorkspacePreferencesModal = () => {
    return useContext(WorkspacePreferenceModalContext);
}