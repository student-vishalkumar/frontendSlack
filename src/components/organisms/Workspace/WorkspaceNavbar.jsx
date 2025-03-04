import { Button } from "@/components/ui/button";
import { useGetWorkspaceById } from "@/hooks/apis/workspace/useGetWorkspaceById";
import { useAuth } from "@/hooks/context/useAuth";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { InfoIcon, LucideLoader2, SearchIcon } from "lucide-react";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

export const WorkspaceNavbar = () => {
  const { workspaceId } = useParams();
  const { logout } = useAuth();
  const navigate = useNavigate()

  console.log('worskid', workspaceId);
  const { isFetching, isSuccess, error, workspace } = useGetWorkspaceById(workspaceId);

  console.log('error in nav', isFetching, isSuccess, error, workspace);
  const { currentWorkspace, setCurrentWorkspace } = useCurrentWorkspace();

  useEffect(() => {

    // console.log('error.status nav', error, isFetching, isSuccess);
    //     if(true) {
    //       console.log('error.status', error, isFetching, isSuccess);
    //       if(error.status === 403) {
    //         console.log('yes');
    //         logout();
    //         navigate('/auth/signin');
    //       }
    //     }
        if(workspace) {
            console.log('ws in ue', workspace);
            setCurrentWorkspace(workspace);
        }
    }, [workspace, setCurrentWorkspace, isFetching, isSuccess, error]);

  console.log('cws', currentWorkspace);
  

  if (isFetching) {
    return <LucideLoader2 className="animate-spin ml-2" />;
  }

  

  return (
    <nav className="flex items-center justify-center h-10 p-1.5 bg-slack-dark">
      <div className="flex-1" />
      <div>
        <Button
          size="sm"
          className="bg-accent/25 hover:bg-accent/15 w-full justify-start h-7 px-2"
        >
          <SearchIcon className="size-5 text-white mr-2" />
          <span className="text-white text-xs">
            Search {workspace?.name || "Workspace"}
          </span>
        </Button>
      </div>

      <div className="ml-auto flex-1 flex items-center justify-end">
        <Button variant="transparent" size="iconSm">
          <InfoIcon className="size-5 text-white" />
        </Button>
      </div>
    </nav>
  );
};
