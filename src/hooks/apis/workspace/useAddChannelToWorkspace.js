import { addChannelToWorkspace } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth"
import { useMutation } from "@tanstack/react-query";

export const useAddChannelToWorkspace = () => {
    const {auth} = useAuth();

    const {isPending, isSuccess, error, mutateAsync: addChannelMutation} = useMutation({
        mutationFn: ({workspaceId, channelName}) =>  
            addChannelToWorkspace({
            workspaceId, channelName, token: auth?.token
        }),


        onSuccess: (res) => {
            console.log('channel added to workspace successfully', res);
        },

        onError: (error) => {
            console.log('error in adding channel to workkspace', error)
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        addChannelMutation
    }
}