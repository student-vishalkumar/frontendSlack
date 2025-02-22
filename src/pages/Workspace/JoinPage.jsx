import { Button } from "@/components/ui/button"
import { useJoinWorkspaceRequest } from "@/hooks/apis/workspace/useJoinWorkspaceRequest";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate, useParams } from "react-router-dom"
import VerificationInput from "react-verification-input"

export const JoinPage = () => {

    const {workspaceId} = useParams();
    const {toast} = useToast();
    const navigate = useNavigate();
    const {JoinWorkspaceMutation} = useJoinWorkspaceRequest(workspaceId)
    async function handleAddedMemberToWorkspace(joinCode) {

        console.log('joincode', joinCode)
        try {
            await JoinWorkspaceMutation(joinCode);

            toast({
                type: 'success',
                title: 'member Join workspace Successfully'
            })

            navigate(`/workspaces/${workspaceId}`);
        } catch (error) {
            console.log('error in joining workspace', error);
        }
    }
    return (
        <div
        className='h-[100vh] flex flex-col gap-y-8 items-center justify-center p-8 bg-white rounded-lg shadow-sm'
        >
        <div className='flex flex-col gap-y-4 items-center justify-center'>
            <div className='flex flex-col gap-y-2 items-center'>
                <h1 className='font-bold text-3xl'>Join Workspace</h1>

                <p>Enter the code that you recieved for join to Workspace</p>
            </div>

            <VerificationInput
            onComplete={handleAddedMemberToWorkspace}
                length={6}
                classNames={{
                        container: 'flex gap-x-2',
                        character: 'h-auto rounded-md border border-gray-300 flex items-center justify-center text-lg font-medium focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500',
                        characterInactive: 'bg-muted',
                        characterFilled: 'bg-white text-black',
                        characterSelected: 'bg-white text-black',
                }}
                autoFocus
            />
             
        </div>

        <div>
            <Button size="lg" variant="outline">
                <Link to={`/workspaces/${workspaceId}`}>
                    Back to the Workspace
                </Link>
            </Button>
        </div>
        </div>
    )
}