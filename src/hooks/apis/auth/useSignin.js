import { signInRequest } from "@/apis/auth"
import { useAuth } from "@/hooks/context/useAuth";
import { useToast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"

export const useSignin = () => {
    const { toast } = useToast();
    const { setAuth } = useAuth();
    const {isPending, isSuccess, error, mutateAsync: signinMutation} = useMutation({
        mutationFn: signInRequest,
        onSuccess: (response) => {
            console.log("successflly signedin", response);

            const userObject = JSON.stringify(response.data);

            console.log('response.data.token',response.data.token)
            
            localStorage.setItem('user', userObject);
            localStorage.setItem('token', response.data.token);

            setAuth({
                user: response.data,
                token: response.data.token,
                isLoading: false
            })
            toast({
                title: 'Successfully signedIn',
                type: 'success'
            });
        },

        onError: (error) => {
            console.error('failed to signin');
            toast({
                title: 'failed to signedin',
                message: error.message,
                type: error,
                varient: destructive
            });
        }
    });

    return {
        isPending,
        isSuccess,
        error,
        signinMutation
    };
};