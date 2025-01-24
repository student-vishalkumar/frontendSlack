import { signUpRequest } from "@/apis/auth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
    const { toast }= useToast();
    const { isPending, isSuccess, error, mutateAsync: signupMutation} = useMutation({
        mutationFn: signUpRequest,
        onSuccess: (response) => {
            console.log('signup successfully', response);
            toast({
                title:'successfully signedup',
                message: 'you will be directed to signin page in a few seconds',
                type: 'success'
            })
        },
        onError: (error) => {
            console.log('failed to signup', error);
            toast({
                title: 'Failed to sign up',
                message: error.message,
                type: 'error',
                variant: 'destructive'
            })
        }
    });

    return {
        isPending, 
        isSuccess, 
        error,
        signupMutation
    }
}