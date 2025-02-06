import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { useDeleteWorkspace } from "@/hooks/apis/workspace/useDeleteWorkspace";
import { useUpdateWorkspace } from "@/hooks/apis/workspace/useUpdateWorkspace";
import { useWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";
import { useToast } from "@/hooks/use-toast";
import { Title } from "@radix-ui/react-dialog";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const WorkspacePreferenceModal = () => {

  const { initialValue, openPreferences, setOpenPreferences, workspace } =
    useWorkspacePreferencesModal();

  const [workspaceId, setWorkspaceId] = useState(null);

  const [editOpen, setEditOpen] = useState(false);

  const [renameValue, setRenameValue] = useState(workspace?.name);

  const { toast } = useToast();
  const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);
  const {isPending, updateWorkspaceMutation} = useUpdateWorkspace(workspaceId);

  const queryClient = useQueryClient();

  const navigate = useNavigate();

  function handleClose() {
    setOpenPreferences(false);
  }

  useEffect(() => {
    setWorkspaceId(workspace?._id);
    setRenameValue(workspace?.name)
  }, [workspace]);

  async function handleDelete() {
    try {
      await deleteWorkspaceMutation();
      navigate("/home");
      queryClient.invalidateQueries("fetchWorkspaces");
      setOpenPreferences(false);
      toast({
        title: "workspace deleted successfully",
        type: "success",
      });
    } catch (error) {
      console.log("error in deleting workspace", error);
      toast({
        title: "Error in deleting workspace",
        type: "error",
      });
    }
  }

  async function handleFormSubmit(e) {
    e.preventDefault();

    try {
      
      await updateWorkspaceMutation(renameValue);
      
      queryClient.invalidateQueries(`fetchWorkspaceById-${workspace?._id}`);
      setEditOpen(false);
      setOpenPreferences(false);
      toast({
        title: 'workspace update successfully',
        type: 'success'
      })
    } catch (error) {
      console.log('error in updating workspace', error);
      throw error;
    }
  }

  return (
    <Dialog open={openPreferences} onOpenChange={handleClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialValue}</DialogTitle>
          <DialogDescription />
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <Dialog open={editOpen} onOpenChange={setEditOpen}>
            <DialogTrigger>
              <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
                <div className="flex items-center justify-between">
                  <p className="font-semibold text-sm">Workspace Name</p>
                  <p className="text-sm font-semibold hover:underline">Edit</p>
                </div>
                <p className="text-sm">{initialValue}</p>
              </div>
            </DialogTrigger>
            <DialogContent>
              <DialogHeader>
                <DialogTitle>
                  Rename Workspace
                </DialogTitle>
              </DialogHeader>
              <form onSubmit={handleFormSubmit}>
                <Input
                value={renameValue}
                onChange={(e) => setRenameValue(e.target.value)}
                required
                autoFocus
                minLength={3}
                maxLength={50}
                disabled={isPending}
                placeholder='Workspace name e.g. Design Web'
                />

              <DialogFooter>
                <DialogClose>
                  <Button
                  varient="outline"
                  disabled="isPending"
                  >
                    Cancel
                  </Button>
                </DialogClose>

                <Button
                type="submit"
                disabled={isPending}
                >
                  Save
                </Button>
              </DialogFooter>
              </form>
            </DialogContent>
          </Dialog>
          <button
            className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50"
            onClick={handleDelete}
          >
            <TrashIcon className="size-5" />
            <p>Delete Workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
