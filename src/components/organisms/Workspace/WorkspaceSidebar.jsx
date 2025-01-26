import { BellIcon, HomeIcon, MessageSquareIcon, MoreHorizontalIcon } from "lucide-react"


import { Sidebarbutton } from "@/components/molecules/SidebarButton"
import { UserButton } from "@/components/atoms/UserButton/UserButton"
import { WorkspaceSwitcher } from "./WorkspaceSwitcher"

export const WorkspaceSidebar = () => {
    return (
        <aside
        className="w-[70px] h-full bg-slack-dark flex flex-col gap-y-4 items-center pt-[10px] pb-[5px]"
        >
            <WorkspaceSwitcher/>
            <Sidebarbutton
                Icon={HomeIcon}
                label="Home"
            />
            <Sidebarbutton
                Icon={MessageSquareIcon}
                label="DMs"
            />
            <Sidebarbutton
                Icon={BellIcon}
                label="Notification"
            />
            <Sidebarbutton
                Icon={MoreHorizontalIcon}
                label="More"
            />

            <div className='flex flex-col items-center justify-center mt-auto mb-5 gap-y-1'>
                <UserButton />
            </div>
        </aside>
    )
}