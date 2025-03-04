import { updateWorkspaceRequest } from "@/apis/workspaces"
import { useAuth } from "@/hooks/context/useAuth"
import { useMutation } from "@tanstack/react-query"

export const useUpdateWorkspace = (workspaceId) => {

    const { auth } = useAuth();
    
    const {isPending, isSuccess, error, mutateAsync: updateWorkspaceMutation} = useMutation({
        mutationFn: (name) => updateWorkspaceRequest({workspaceId, name, token: auth?.token}),

        onSuccess: (data) => {
            console.log('workspace update successfully',data);
        },

        onError: (error) => {
            console.log('error in workspace update', error);
        } 
    })

    return {
        isPending,
        isSuccess,
        error,
        updateWorkspaceMutation
    }
}

