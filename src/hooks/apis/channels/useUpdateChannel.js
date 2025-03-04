import { updateChannelRequest } from "@/apis/channels"
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation } from "@tanstack/react-query"

export const useUpdateChannel = (channelId) => {

    const { auth } = useAuth();
    console.log('auth?.token', auth?.token);
    const {isPending, isSuccess, error, mutateAsync:updateChannelMutation} = useMutation({
        mutationFn: (name) => updateChannelRequest({channelId, token: auth?.token, name}),

        onSuccess: (data) => {
            console.log("channel updated is successfully", data);
        },

        onError: (error) => {
            console.log('error in channel update', error);
        }
    });

    return {
        isPending,
        isSuccess, 
        error,
        updateChannelMutation
    }
}