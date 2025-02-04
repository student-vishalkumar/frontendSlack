import { Button } from "@/components/ui/button"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { useFetchWorkspace } from "@/hooks/apis/workspace/useFetchWorkspace";
import { useGetWorkspaceById } from "@/hooks/apis/workspace/useGetWorkspaceById";
import { Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

export const WorkspaceSwitcher = () => {

    const navigate = useNavigate();

    const { workspaceId } = useParams();

    const { isFetching, workspace } = useGetWorkspaceById(workspaceId);

    const { workspaces, isFetching: isFetchingWorkspce} = useFetchWorkspace();
    return (
        <div>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                    className='size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 font-semibold text-slate-800 text-xl'
                    >
                    {isFetching?(<Loader className='size-5 animate-spin' />): workspace.name.charAt(0).toUpperCase()}
                    </Button>
                </DropdownMenuTrigger>

                <DropdownMenuContent>
                    <DropdownMenuItem
                    className='cursor-pointer flex-col justify-start items-start'
                    >
                    {workspace?.name}
                    <span className='text-xs text-muted-foregorund'>
                        (Active Workspace)
                    </span>
                    </DropdownMenuItem>
                    {isFetchingWorkspce?(<Loader className='size-5 animate-spin' />):workspaces?.map((workspace) => {

                        if(workspace._id === workspaceId) {
                            return null;
                        }

                        return (
                            <DropdownMenuItem
                             className='cursor-pointer flex-col justify-start items-start'
                            onClick={() => navigate(`/workspaces/${workspace._id}`)}
                            key={workspace._id}
                            >
                                <p >
                                
                                {workspace?.name}
                                </p>
                            </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    )
}