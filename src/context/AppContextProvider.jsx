import combineContext from "@/utils/combineContext";

import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceContextProvider } from "./createWorkspaceContext";
import { WorkspacePreferenceModalContextProvider } from "./WorkspacePreferenceModalContext";
import { CreateChannelContextProvider } from "./createChannelContext";

export const AppContextProvider = combineContext(
    AuthContextProvider,
    CreateWorkspaceContextProvider,
    WorkspacePreferenceModalContextProvider,
    CreateChannelContextProvider
);