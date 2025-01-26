import { UserButton } from "@/components/atoms/UserButton/UserButton"
import { useFetchWorkspace } from "@/hooks/apis/workspace/useFetchWorkspace"
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const Home = ()=> {

    const { isFetching, isSuccess, error, workspaces} = useFetchWorkspace();

    const navigate = useNavigate();
    
    useEffect(() => {
        if(isFetching) {
            return;
        }

        console.log('workspaces[0]',workspaces[0])

        if(workspaces.length === 0 || !workspaces) {
            console.log('No workspace found , creating one');
        } else {
            navigate(`/workspaces/${workspaces[0]._id}`);
        }
    },[isFetching, workspaces, navigate])
    return (
        <>
            <h1>Home</h1>
            <UserButton/>
        </>
    )
}