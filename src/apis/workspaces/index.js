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

        console.log('fetched workspaces', response);

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

        console.log('fetched workspace By id', response?.data?.data);

        return response?.data?.data;
    } catch (error) {
        console.log('fetch workspaceById eoor', error);
        throw error.response.data
    }
}

export const deleteWorkspaceRequest = async({workspaceId, token}) => {
    try {
        const response = await axios.delete(`/workspaces/${workspaceId}`, {
            headers: {
                'x-access-token': token
            }
        });

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

        return response?.data?.data;

    } catch (error) {
        console.log('update workspace Request error', error);
    }

}