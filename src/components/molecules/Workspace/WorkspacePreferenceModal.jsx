import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { useDeleteWorkspace } from "@/hooks/apis/workspace/useDeleteWorkspace";
import { useWorkspacePreferencesModal } from "@/hooks/context/useWorkspacePreferencesModal";
import { useToast } from "@/hooks/use-toast";
import { Title } from "@radix-ui/react-dialog";
import { QueryClient, useQueryClient } from "@tanstack/react-query";
import { TrashIcon } from "lucide-react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const WorkspacePreferenceModal = () => {
  const { initialValue, openPreferences, setOpenPreferences, workspace} =
    useWorkspacePreferencesModal();

  const [ workspaceId, setWorkspaceId] = useState(null);

  const {toast} = useToast();

  const { deleteWorkspaceMutation } = useDeleteWorkspace(workspaceId);

  const queryClient = useQueryClient();
  const navigate = useNavigate();


  function handleClose() {
    setOpenPreferences(false);
  }

  useEffect(() => {
    setWorkspaceId(workspace?._id)
  }, [workspace])

  async function handleDelete() {
    try {
      await deleteWorkspaceMutation();
      navigate('/home');
      queryClient.invalidateQueries('fetchWorkspaces');
      setOpenPreferences(false);
      toast({
        title: 'workspace deleted successfully',
        type: 'success'
      })
    } catch (error) {
      console.log('error in deleting workspace', error);
      toast({
        title: 'Error in deleting workspace', 
        type: 'error'
      })
    }
  }
  return (
    <Dialog
    open={openPreferences} 
    onOpenChange={handleClose}
    >
      <DialogContent>
        <DialogHeader>
          <DialogTitle>{initialValue}</DialogTitle>
          <DialogDescription/>
        </DialogHeader>
        <div className="px-4 pb-4 flex flex-col gap-y-2">
          <div className="px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50">
            <div className="flex items-center justify-between">
              <p className="font-semibold text-sm">Workspace Name</p>
              <p className="text-sm font-semibold hover:underline">Edit</p>
            </div>
            <p className="text-sm">{initialValue}</p>
          </div>
          <button className="flex items-center gap-x-2 px-5 py-4 bg-white rounded-lg border cursor-pointer hover:bg-gray-50" onClick={handleDelete}>
            <TrashIcon className="size-5" />
            <p>Delete Workspace</p>
          </button>
        </div>
      </DialogContent>
    </Dialog>
  );
};
