import combineContext from "@/utils/combineContext";

import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceContextProvider } from "./createWorkspaceContext";
import { WorkspacePreferenceModalContextProvider } from "./WorkspacePreferenceModalContext";
import { CreateChannelContextProvider } from "./createChannelContext";
import { WorkspaceContextProvider } from "./WorkspaceContext";
import { ChannelUpdateContextProvider } from "./ChannelUpdateContextProvider";
import { SocketContextProvider } from "./SocketContext";
import { ChannelMessageContextProvider } from "./ChannelMessageContext";

export const AppContextProvider = combineContext(
    ChannelMessageContextProvider,
    SocketContextProvider,
    AuthContextProvider,
    WorkspaceContextProvider,
    CreateWorkspaceContextProvider,
    WorkspacePreferenceModalContextProvider,
    CreateChannelContextProvider
);