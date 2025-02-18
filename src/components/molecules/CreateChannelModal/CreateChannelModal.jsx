import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useCreateChannelModal } from "@/hooks/context/useCreateChannelModal";
import { useState } from "react";

export const CreateChannelModal = () => {
  const { openCreateChannelModal, setOpenCreateChannelModal } =
    useCreateChannelModal();

  const [channelName, setChannelName] = useState("");

  function handleClose() {
    setOpenCreateChannelModal(false);
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
        <form>
          <Input
            value={channelName}
            onChange={(e) => setChannelName(e.target.value)}
            minLength={3}
            placeholder="Channel Name e.g. Cyber Security"
            required
          />
        </form>

        <div className="flex justify-end mt-4">
          <Button>
          CreateChannel
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
