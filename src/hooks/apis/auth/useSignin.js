import { signInRequest } from "@/apis/auth"
import { useToast } from "@/hooks/use-toast"
import { useMutation } from "@tanstack/react-query"

export const useSignin = () => {
    const { toast } = useToast();
    const {isPending, isSuccess, error, mutateAsync:signinMutation} = useMutation({
        mutationFn: signInRequest,
        onSuccess: (data) => {
            console.log("successflly signedin", data);
            toast({
                title: 'Successfully signedIn',
                type: 'success'
            });
        },

        onError: (erroe) => {
            console.error('failed to signin');
            toast({
                title: 'failsed to signedin',
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