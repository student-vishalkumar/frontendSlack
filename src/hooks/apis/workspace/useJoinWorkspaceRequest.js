import { joinWorkspaceRequest } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth"
import { useMutation } from "@tanstack/react-query";

export const useJoinWorkspaceRequest = (workspaceId) => {
    const { auth } = useAuth();
    
    const {isPending, isSuccess, error, mutateAsync: JoinWorkspaceMutation} = useMutation({
        mutationFn: (joinCode) => joinWorkspaceRequest({workspaceId, joinCode, token: auth?.token}),

        onSuccess: () => {
            console.log('workspace join successfully');
        },

        onError: (error) => {
            console.log('error in joining workspace', error)
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        JoinWorkspaceMutation
    }
}