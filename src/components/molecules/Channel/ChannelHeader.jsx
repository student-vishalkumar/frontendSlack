import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useGetChannelById } from "@/hooks/apis/channels/useGetChannelById";
import { useUpdateChannel } from "@/hooks/apis/channels/useUpdateChannel";
import { useConfirmation } from "@/hooks/context/useConfirmation";
import { useQueryClient } from "@tanstack/react-query";
import { useState } from "react";

import { FaChevronDown } from "react-icons/fa";
import { useParams } from "react-router-dom";

export const ChannelHeader = ({ channel }) => {

  console.log('channel', channel);
  const queryClient = useQueryClient();
  const [rename, setRename] = useState(channel?.name)

  const [editOpen, setEditOpen] = useState(false);

  const {isPending, updateChannelMutation} = useUpdateChannel(channel?._id);

  const {Confirmation, ConfirmDialog} = useConfirmation({title: 'Do you want to update name of channel', message: 'This step can not be undo'});
  
  async function handleFormSubmit(e) {
    e.preventDefault();
    try {
      const ok = await Confirmation();
      if(!ok) {
        return;
      }
      await updateChannelMutation(rename);
      queryClient.invalidateQueries(`fetchWorkspaceById-${channel?.workspaceId}`)
      setEditOpen(false);
      setOpenModal(!openModal);
    } catch (error) {
      console.log('error in updateChannel handle', error);
      throw error;
    }
  }
  
  return (
    <div>
    <ConfirmDialog/>
      <Dialog>
        <DialogTrigger>
          <Button>
            <span># {channel}</span>
            <FaChevronDown className="size-3 ml-2" />
          </Button>
        </DialogTrigger>
        <DialogContent>
          <DialogHeader>
            <DialogTitle># {channel?.name}</DialogTitle>
          </DialogHeader>
          <div className="px-4 pb-4 flex flex-col gap-y-2">
            <Dialog open={editOpen} onOpenChange={setEditOpen}>
              <DialogTrigger>
                <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-100">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-semibold"> Channel name</p>
                    <p className="text-sm font-semibold"> Edit</p>
                  </div>
                  <p className="text-sm">{channel?.name}</p>
                </div>
              </DialogTrigger>
              <DialogContent>
                <DialogHeader>
                  <DialogTitle>Rename Channel</DialogTitle>
                </DialogHeader>
                <form onSubmit={handleFormSubmit}>
                  <Input
                  value={rename}
                  onChange={(e) => setRename(e.target.value)}
                  minLength={3}
                  maxLength={30}
                  required
                  autoFocus
                  disabled={isPending}
                  placeholder="Channel Name e.g. cyber"
                  />
                  <DialogFooter>
                    <DialogClose>
                      <Button>
                        Cancel
                      </Button>
                    </DialogClose>

                    <Button
                    type="submit"
                    >
                      Save
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </DialogContent>
      </Dialog>
    </div>
  );
};
