import { CreateChannelModal } from "@/components/molecules/CreateChannelModal/CreateChannelModal"
import { CreateWorkspaceModal } from "@/components/molecules/createWorkspaceModal/CreateWorkspaceModal"
import { WorkspacePreferenceModal } from "@/components/molecules/Workspace/WorkspacePreferenceModal"

export const Modals = () => {
    return (
        <>
            <CreateWorkspaceModal/>
            <WorkspacePreferenceModal/>
            <CreateChannelModal />
        </>
    )
}