import { removeMemberFromWorkspace } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { toast, useToast } from "@/hooks/use-toast";
import { useMutation, useQueryClient } from "@tanstack/react-query"

export const useRemoveMember = (workspaceId, memberId) => {
    const queryClient = useQueryClient();
    const {auth} = useAuth();
    const {toast} = useToast();
    const {isPending, isSuccess, error, mutateAsync: removeMemberMutation} = useMutation({
        mutationFn: () => removeMemberFromWorkspace({workspaceId, memberId, token:auth?.token}),

        onSuccess: (data) => {
            toast({
                titlr: 'Member removed Successfully',
                type: 'success'
            });
            queryClient.invalidateQueries(`fetchWorkspaceById-${workspaceId}`);
        },

        onError: (error) => {
            console.log("error in fetching successfully", error?.response?.data?.err);
            const message = error?.response?.data?.err;
            toast({
                title: message,
                type: 'fail'
            })
        }

    });

    return {
        isPending,
        isSuccess,
        error,
        removeMemberMutation
    }
}