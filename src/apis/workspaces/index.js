import axios from '@/config/axiosConfig';

export const createWorkspaceRequest = async({name, description, token}) => {

    try {
        const response = await axios.post('/workspaces', {name, description}, {
            headers: {
                'x-access-token': token
            }
        })
        
        console.log('response in create workspace',response);

        return response?.data?.data;
    } catch (error) {
        console.log('error in create workspace', error);
        throw error.response.data;
    }

}


export const fetchWorkspacesRequest = async({token}) => {
    try {
        const response = await axios.get('/workspaces', {
            headers: {
                'x-access-token': token
            }
        });


        return response?.data?.data;
    } catch (error) {
        console.log('fetch workspace error', error);
        throw error.response.data;
    }
}


export const fetchWorkspaceByWorkspaceId = async({workspaceId, token}) => {
    try {
        const response = await axios.get(`/workspaces/${workspaceId}`, {
            headers:{
                'x-access-token': token
            }
        })

        console.log('data in req',response?.data?.data);
        return response?.data?.data;
    } catch (error) {
        console.log('fetch workspaceById eoor', error.response);
        throw error.response;
    }
}

export const deleteWorkspaceRequest = async ({workspaceId, token}) => {
    try {
        const response = await axios.delete(`/workspaces/${workspaceId}`, {
            headers: {
                'x-access-token': token
            }
        });

        console.log("response",response?.data?.data)
        return response?.data?.data;
    } catch (error) {
        console.log('delete workspace request error', error);
        throw error.response.data;
    }
}

export const updateWorkspaceRequest = async({workspaceId, name, token}) => {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}`, {name}, {
            headers: {
                'x-access-token': token
            }
        });

        console.log('res',response?.data?.data)

        return response?.data?.data;

    } catch (error) {
        console.log('update workspace Request error', error);
    }

}


export const addChannelToWorkspace = async({workspaceId, channelName, token}) => {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}/channels`, {channelName}, {
            headers: {
                'x-access-token': token
            }
        });

        console.log('response',response?.data?.data)
        return response?.data?.data;
    } catch(error) {
        console.log('errror is addChannelToWS', error);
        throw error.response.data;
    }
}

export const resetJoinCode = async({workspaceId, token})=> {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}/joinCode/reset`,{}, {
            headers: {
                'x-access-token': token
            }
        });

        return response?.data?.data;
    } catch (error) {
        console.log('reset join code error', error);
        throw error;
    }
}

export const joinWorkspaceRequest = async({workspaceId, joinCode, token}) => {
    try {
        const response = await axios.put(`/workspaces/${workspaceId}/join`, {joinCode}, {
            headers: {
                'x-access-token': token
            }
        });

        return response?.data?.data;
    } catch (error) {
        console.log('join workspace request error', error);
        throw error;
    }
}

export const removeMemberFromWorkspace = async({workspaceId, memberId, token}) => {
    try{
        const response = await axios.patch(`/workspaces/removeMember`, {
            workspaceId, memberId
        },{
            headers: {
                'x-access-token': token
            }
        });
        
        return response?.data?.data;
    } catch(error) {
        throw error;
    }
}