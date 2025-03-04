import { fetchWorkspaceByWorkspaceId } from "@/apis/workspaces";
import { useAuth } from "@/hooks/context/useAuth"
import { useQuery } from "@tanstack/react-query";

export const useGetWorkspaceById = (id) => {
    const { auth } = useAuth();

    console.log('id in ftc', id);
    const {isFetching, isSuccess, error, data: workspace} = useQuery({
        queryFn:() => fetchWorkspaceByWorkspaceId({workspaceId: id, token: auth?.token}),
        queryKey: [`fetchWorkspaceById-${id}`],
        staleTime: 10000
    })

    console.log('error in ftc', error);

    return {
        isFetching,
        isSuccess,
        error,
        workspace
    }
}