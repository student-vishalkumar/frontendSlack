import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { useCreateWorkspace } from "@/hooks/apis/workspace/useCreateWorkspace";
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import { useQueryClient } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const CreateWorkspaceModal = () => {

    const navigate = useNavigate();

    const queryClient = useQueryClient();

    const [workspaceName, setWorkspaceName] = useState('');

    const {isPending, createWorkspaceMutation} = useCreateWorkspace();

    const { openCreateWorkspaceModal, setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

    async function handleFormSubmit(e) {
        e.preventDefault();

        try {
            const data = await createWorkspaceMutation({name: workspaceName});
            console.log('data workspace', data)
            navigate(`/workspaces/${data._id}`);
            queryClient.invalidateQueries('fetchWorkspaces');
        } catch(error) {
            console.log('not able to create Workspace', error);
        } finally{
            setWorkspaceName('');
            setOpenCreateWorkspaceModal(false)
        }
    }

    function handleClose() {
            setOpenCreateWorkspaceModal(false);
    }

    // useEffect(() => {
    //     if (!openCreateWorkspaceModal) {
    //         document.body.style.pointerEvents = "auto"; // Reset to auto when modal closes
    //     }
    // }, [openCreateWorkspaceModal]);

    return (
        <Dialog
        open={openCreateWorkspaceModal}
        onOpenChange={handleClose}
        modal={false}
        >
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>Create a Workspace</DialogTitle>
                    <DialogDescription>create</DialogDescription>
                </DialogHeader>
            

            <form onSubmit={handleFormSubmit}>
                <Input
                    required
                    minLength={3}
                    type="text"
                    placeholder="Put a workspace Name e.g. Test Workspace"
                    disabled={isPending}
                    value={workspaceName}
                    onChange={(e) => setWorkspaceName(e.target.value)}
                />

                <div className="flex justify-end mt-5">
                    <Button disbaled={isPending}>Create</Button>
                </div>
            </form>
            </DialogContent>
        </Dialog>
    )
}