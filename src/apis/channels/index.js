import axios from "@/config/axiosConfig"

export const getChannelById = async({channelId, token}) => {
    try {
        const response = await axios.get(`/channels/${channelId}`, {
            headers: {
                'x-access-token': token
            }
        });
        return response?.data?.data;
    } catch (error) {
        console.log('getChannelById error', error);
        
        throw error;
    }
}

export const updateChannelRequest = async({channelId, name, token}) => {
    try {

        console.log('chid, token, name', channelId, token, name);
        const response = await axios.put(`/channels/${channelId}`,{name}, {
            headers: {
                'x-access-token': token
            }
        });

        console.log('update channel',response?.data?.data )

        return response?.data?.data;
    } catch (error) {
        console.log('updateChannelRequest error', error);

        throw error;
    }
}