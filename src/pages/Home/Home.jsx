import { UserButton } from "@/components/atoms/UserButton/UserButton"
import { useFetchWorkspace } from "@/hooks/apis/workspace/useFetchWorkspace"
import { useEffect } from "react";

export const Home = ()=> {

    const { isFetching, isSuccess, error, workspaces} = useFetchWorkspace();
    
    useEffect(() => {
        if(isFetching) {
            return;
        }

        if(workspaces.length === 0 || !workspaces) {
            console.log('No workspace found , creating one');
        }
    },[isFetching, workspaces])
    return (
        <>
            <h1>Home</h1>
            <UserButton/>
        </>
    )
}