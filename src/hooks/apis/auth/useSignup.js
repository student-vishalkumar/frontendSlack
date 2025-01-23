import { signUpRequest } from "@/apis/auth";
import { useToast } from "@/hooks/use-toast";
import { useMutation } from "@tanstack/react-query";

export const useSignup = () => {
    const { toast }= useToast();
    const { isPending, isSuccess, error, mutateAsync: signupMutation} = useMutation({
        mutationFn: signUpRequest,
        onSuccess: (data) => {
            console.log('signup successfully', data);
            toast({
                title:'successfully signedup',
                message: 'you will be directed to signin page in a few seconds',
                type: 'success'
            })
        },
        onError: (error) => {
            console.log('failsd to signup', error);
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