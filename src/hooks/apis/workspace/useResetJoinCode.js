import { resetJoinCode } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useResetJoinCode = (workspaceId) => {
  const { auth } = useAuth();

  const queryClient = useQueryClient();
  const {
    isPending,
    isSuccess,
    error,
    mutateAsync: resetJoinCodeMutation,
  } = useMutation({
    mutationFn: () => resetJoinCode({ workspaceId, token: auth?.token }),

    onSuccess: (data) => {
        queryClient.invalidateQueries(`fetchWorkspaceById-${workspaceId}`)
        console.log('join code reset successfully',data)
    },

    onError: (error) => {
        console.log('reset join code error', error);
    }
  });

  return {
    isPending,
    isSuccess,
    error,
    resetJoinCodeMutation
  }
};
