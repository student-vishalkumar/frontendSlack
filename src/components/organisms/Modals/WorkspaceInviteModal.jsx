import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { useResetJoinCode } from "@/hooks/apis/workspace/useResetJoinCode";
import { useToast } from "@/hooks/use-toast";

import { CopyIcon, RefreshCcwIcon } from "lucide-react"
import { useEffect, useState } from "react";

export const WorkspaceInviteModal = ({openInviteModal, setOpenInviteModal, workspaceName, joinCode, workspaceId}) => {

    const {toast} = useToast();

    const {resetJoinCodeMutation} = useResetJoinCode(workspaceId);
    
    const [link, setLink] = useState("");

    useEffect(() => {
        const org = window.location.origin;
        setLink(org);
        console.log("org", org);
    }, [])
    
    async function handleCopy() {
        console.log('headLink', link);
        const inviteLink = `${link}/workspaces/join/${workspaceId}`;

        await navigator.clipboard.writeText(inviteLink);

        toast({
            type: 'success',
            title: 'link copied to clipboard'

        })
    }
    

    async function handleResetJoinCode() {
        try {
            await resetJoinCodeMutation();

            toast({
                type: 'success',
                title: 'join code reset successfully'
            })
        } catch (error) {
            console.log('error in reset join code', error);
        }
    }
    return (
        <Dialog open={openInviteModal} onOpenChange={setOpenInviteModal}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        Invite People to {workspaceName}
                    </DialogTitle>

                    <DialogDescription>
                        Use the code shown below to invite people to your workspace
                    </DialogDescription>
                </DialogHeader>

                <div
                className='flex flex-col items-center justify-center py-10 gap-y-4'
                >
                    <p className='font-bold text-4xl uppercase'>
                        {joinCode}
                    </p>

                    <Button onClick={handleCopy}>
                    Copy Link
                        <CopyIcon className='size-4 ml-2'/>
                    </Button>

                    <a
                    href={`/workspaces/join/${workspaceId}`}
                    target="_blank"
                    rel="noreferrer"
                    className='text-blue-500'
                    >
                        Redirect to join page
                    </a>
                </div>

                <div
                className='flex item-center justify-center w-full'
                >
                <Button 
                varient='outline'
                onClick={handleResetJoinCode}
                >
                    Reset Join code
                    <RefreshCcwIcon className='size-4 ml-2'/>
                </Button>
                </div>
            </DialogContent>
        </Dialog>
    )
}