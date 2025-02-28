import { ChatInput } from "@/components/molecules/ChatInput/ChatInput";
import { useGetChannelById } from "@/hooks/apis/channels/useGetChannelById";
import { Loader2Icon, TriangleAlertIcon } from "lucide-react";
import { useParams } from "react-router-dom"

export const Channel = () => {
    const { channelId } = useParams();

    const { isFetching, isError, channelDetails} = useGetChannelById(channelId);
    console.log('chd', channelDetails);
    if(isFetching) {
        return (
            <div className='h-full flex flex-col items-center justify-center'>
                <Loader2Icon className='size-5 animate-spin text-muted-foreground'/>
            </div>
        )
    }

    if(isError) {
        return (
            <div className='h-full flex-1 flex flex-col gap-y-2 items-center justify-center'>
                <TriangleAlertIcon className='size-6 text-muted-foreground' />
                <span className='text-sm text-muted-foreground'>Channel Not found</span>
            </div>
        )
    }
    return (
        <div className='flex flex-col h-full'>
            <div className='flex-1'/>
            <ChatInput/>
        </div>
    )
}