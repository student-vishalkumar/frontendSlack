import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog"
import { useAddChannelToWorkspace } from "@/hooks/apis/workspace/useAddChannelToWorkspace"
import { useChannelUpdateModal } from "@/hooks/context/useChannelUpdateModal"

export const ChannelUpdateModal = () => {

    const {initialValue, setInitialValue} = useChannelUpdateModal();
    return (
        <>
            <Dialog>
                <DialogContent>
                    <DialogTitle>
                    {initialValue}
                    </DialogTitle>
                </DialogContent>
            </Dialog>
        </>
    )
}