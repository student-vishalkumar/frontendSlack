import { createContext, useState } from 'react';

const WorkspacePreferenceModalContext = createContext();

export const WorkspacePreferenceModalContextProvider = ({children}) => {

    const [openPreferences, setOpenPreferences] = useState(false);

    const [initialValue, setInitialValue] = useState('Edit Workspace');

    return (
        <WorkspacePreferenceModalContext.Provider value={{openPreferences, setOpenPreferences, initialValue, setInitialValue}}>
            {children}
        </WorkspacePreferenceModalContext.Provider>
    )
}

export default WorkspacePreferenceModalContext;