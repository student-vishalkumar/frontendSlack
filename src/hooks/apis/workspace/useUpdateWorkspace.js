import { updateWorkspaceRequest } from "@/apis/workspaces"
import { useAuth } from "@/hooks/context/useAuth"
import { useMutation } from "@tanstack/react-query"

export const useUpdateWorkspace = (workspaceId, name) => {

    const { auth } = useAuth();
    const {isPending, isSuccess, error, mutateAsync: updateWorkspaceMutation} = useMutation({
        mutationFn: () => updateWorkspaceRequest({workspaceId, name, token: auth?.token}),

        onSuccess: () => {
            console.log('workspace update successfully');
        },

        onError: ()=> {
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