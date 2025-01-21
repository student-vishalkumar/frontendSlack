import { signUpRequest } from "@/apis/auth";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
    const { isPending, isSuccess, error, mutate: signupMutation} = useMutation({
        mutationFn: signUpRequest,
        onSuccess: (data) => {
            console.log('signup successfully', data);
        },
        onError: (error) => {
            console.log('failsd to signup', error);
        }
    });

    return {
        isPending, 
        isSuccess, 
        error,
        signupMutation
    }
}