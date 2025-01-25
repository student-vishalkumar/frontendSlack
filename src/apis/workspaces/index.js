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

        return response?.data;
    } catch (error) {
        console.log('fetch workspace error', error);
        throw error.response.data;
    }
}