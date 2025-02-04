import combineContext from "@/utils/combineContext";

import { AuthContextProvider } from "./AuthContext";
import { CreateWorkspaceContextProvider } from "./createWorkspaceContext";
import { WorkspacePreferenceModalContextProvider } from "./WorkspacePreferenceModalContext";

export const AppContextProvider = combineContext(
    AuthContextProvider,
    CreateWorkspaceContextProvider,
    WorkspacePreferenceModalContextProvider
);