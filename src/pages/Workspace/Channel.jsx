
import { useGetChannelPaginatedMessages } from "@/hooks/apis/channels/useGetChannelPaginatedMessages";
import { useChannelMessageContext } from "@/hooks/context/useChannelMessageContext";


import { useQueryClient } from '@tanstack/react-query';
 import { Loader2Icon, TriangleAlertIcon } from 'lucide-react';
 import { useEffect, useRef } from 'react';
 import { useParams } from 'react-router-dom';
 
 import { ChannelHeader } from '@/components/molecules/Channel/ChannelHeader';
 import { ChatInput } from '@/components/molecules/ChatInput/ChatInput';
 import { Message } from '@/components/molecules/Message/Message';
 import { useGetChannelById } from '@/hooks/apis/channels/useGetChannelById';


 import { useSocket } from '@/hooks/context/useSocket';
 
 export const Channel = () => {
 
     const { channelId } = useParams();
 
     const queryClient = useQueryClient();
 
     const { channelDetails, isFetching, isError } = useGetChannelById(channelId);
     const { setMessageList, messageList } = useChannelMessageContext();
 
     console.log('messageList1', messageList)
     const { joinChannel } = useSocket();
 
     const { messages, isSuccess } = useGetChannelPaginatedMessages(channelId);
 
     const messageContainerListRef = useRef(null);
 
     useEffect(() => {
         if(messageContainerListRef.current) {
             messageContainerListRef.current.scrollTop = messageContainerListRef.current.scrollHeight;
         }
     }, [messageList]);
 
     useEffect(() => {
         queryClient.invalidateQueries(`get-channel-${channelId}`);
     }, [channelId]);
 
     useEffect(() => {
        console.log('isfetched');
         if(!isFetching && !isError) {
             
             joinChannel(channelId);
 
         }
     }, [isFetching, isError, joinChannel, channelId]);
 
     useEffect(() => {
         if(isSuccess ) {
             console.log('Channel Messages fetched');
             setMessageList(messages);
         }
     }, [isSuccess, messages, setMessageList, channelId]);
 
     if(isFetching) {
         return (
             <div
                 className='h-full flex-1 flex items-center justify-center'
             >
                 <Loader2Icon className='size-5 animate-spin text-muted-foreground' />
             </div>
         );
     }
 
     if(isError) {
         return (
             <div className='h-full flex-1 flex flex-col gap-y-2 items-center justify-center'>
                 <TriangleAlertIcon className='size-6 text-muted-foreground' />
                 <span className='text-sm text-muted-foreground'>Channel Not found</span>
             </div>
         );
     }
 
     console.log('messageList', messageList);
     return (
         <div className='flex flex-col h-full'>
             <ChannelHeader channel={channelDetails.name} />
 
             <div
                 ref={messageContainerListRef}
                 className='flex-5 overflow-y-auto p-5 gap-y-2'
             >
                 {messageList?.map((message) => {
                    console.log('author', message.senderId);
                     return <Message key={message._id} body={message.body} authorImage={message.senderId?.avatar} authorName={message.senderId?.username} createdAt={message.createdAt}   />;
                 })}   
             </div> 
                        
 
 
             <div className='flex-1' /> 
             <ChatInput />
         </div>
     );
}