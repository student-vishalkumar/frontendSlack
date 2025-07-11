import { WorkspaceNavbar } from "@/components/organisms/Workspace/WorkspaceNavbar";
import { WorkspacePanel } from "@/components/organisms/Workspace/WorkspacePanel";
import { WorkspaceSidebar } from "@/components/organisms/Workspace/WorkspaceSidebar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const WorkspaceLayout = ({ children }) => {

  
  
  return (
    <div className="h-[100vh]">
      <WorkspaceNavbar />
      <div className="flex h-[calc(100vh-40px)]" autosaveid={'workspace-resize'}>
        <WorkspaceSidebar />
        <ResizablePanelGroup
        direction="horizontal"
        >
          <ResizablePanel
          defaultSize={20}
          minSize={11}
          className='bg-blue-950'
          >
            <WorkspacePanel/>
          </ResizablePanel>
          <ResizableHandle withHandle/>
            <ResizablePanel minSize={20}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
