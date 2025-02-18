import { useQueryClient } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useAddChannelToWorkspace } from "@/hooks/apis/workspace/useAddChannelToWorkspace";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { useToast } from "@/hooks/use-toast";
import { useState } from "react";

export const CreateChannelModal = () => {
  const {toast} = useToast();

  const queryClient = useQueryClient();

  const { openCreateChannelModal, setOpenCreateChannelModal } =
    useCreateChannelModal();

  const [channelName, setChannelName] = useState("");

  const {isSuccess, addChannelMutation} = useAddChannelToWorkspace();

  const {currentWorkspace} = useCurrentWorkspace();

  function handleClose() {
    setOpenCreateChannelModal(false);
  }

  async function handleFormSubmit(e) {
    e.preventDefault();
     console.log('chnlname', channelName)
    await addChannelMutation({
      workspaceId: currentWorkspace?._id,
      channelName: channelName
    })

    queryClient.invalidateQueries(`fetchWorkspaceById-${currentWorkspace?._id}`)

    handleClose();
    
    toast({
      type: 'success',
      title: 'channel Created Successfully'
    })

  }

  return (
    <Dialog
    open={openCreateChannelModal}
    onOpenChange={handleClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create Channel</DialogTitle>
        </DialogHeader>
        <form onSubmit={handleFormSubmit}>
          <Input
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            minLength={3}
            placeholder="Channel Name e.g. Cyber Security"
            required
          />

        <div className="flex justify-end mt-4">
          <Button>
          CreateChannel
          </Button>
        </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};
