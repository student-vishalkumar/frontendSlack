import axios from '@/config/axiosConfig'

export const signUpRequest = async({email, password, username}) => {
    try {
        const response = await axios.post('/users/signup',{
            email,
            password,
            username
        });
        console.log('signup response',response);
        return response.data;
    } catch (error) {
        console.log(error);
        throw error.response.data;
    }
}

export const signInRequest = async({email, password}) => {
    try {
        const response = await axios.post('/users/signin', {
            email,
            password
        })

        console.log('signin response', response)

        return response.data;

    } catch (error) {

        console.log(error);
        throw error.rsponse.data;
    }
}