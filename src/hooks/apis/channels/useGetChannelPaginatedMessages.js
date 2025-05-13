import { getPaginatedMessages } from "@/apis/channels";
import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from "@tanstack/react-query"

export const useGetChannelPaginatedMessages = (channelId) => {

    const {auth} = useAuth();
    console.log('auth', auth);
    const {isFetched, isError, error, data, isSuccess } = useQuery({
        queryFn: () => getPaginatedMessages({channelId, limit:20, offset:0, token: auth?.token}),
        queryKey: ['getPaginatedMessages']
    });

    return {
        isFetched,
        isError,
        error,
        messages: data, 
        isSuccess
    }
}