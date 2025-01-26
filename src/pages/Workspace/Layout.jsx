import { WorkspaceNavbar } from "@/components/organisms/Workspace/WorkspaceNavbar";
import { WorkspaceSidebar } from "@/components/organisms/Workspace/WorkspaceSideBar";
import {
  ResizableHandle,
  ResizablePanel,
  ResizablePanelGroup,
} from "@/components/ui/resizable";

export const WorkspaceLayout = ({ children }) => {
  return (
    <div className="h-[100vh]">
      <WorkspaceNavbar />
      <div className="flex h-[calc(100vh-40px)]" autoSaveId={'workspace-resize'}>
        <WorkspaceSidebar />
        <ResizablePanelGroup
        direction="horizontal"
        >
          <ResizablePanel
          defaultSize={20}
          minSize={11}
          className='bg-slack-medium'
          >
            <div>SiderBar</div>
          </ResizablePanel>
          <ResizableHandle withHandle/>
            <ResizablePanel minSize={20}>{children}</ResizablePanel>
        </ResizablePanelGroup>
      </div>
    </div>
  );
};
