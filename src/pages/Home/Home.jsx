import { UserButton } from "@/components/atoms/UserButton/UserButton"

import { useFetchWorkspace } from "@/hooks/apis/workspace/useFetchWorkspace"
import { useCreateWorkspaceModal } from "@/hooks/context/useCreateWorkspaceModal";
import { Image } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom"
import  TeamLogo  from "@/pages/Home/TeamLogo.jpeg"


export const Home = ()=> {

    const { isFetching, isSuccess, error, workspaces} = useFetchWorkspace();

    const { setOpenCreateWorkspaceModal } = useCreateWorkspaceModal();

    const navigate = useNavigate();
    
    useEffect(() => {
        if(isFetching) {
            return;
        }

        console.log('workspaces[0]',workspaces[0])

        if(workspaces.length === 0 || !workspaces) {
            console.log('No workspace found , creating one');
            setOpenCreateWorkspaceModal(true);
        } else {
            navigate(`/workspaces/${workspaces[0]._id}`);
        }
    },[isFetching, workspaces, navigate])
    return (
        <>
            <div>
                <div>
                    <nav className='w-full h-20 bg-pink-500 flex p-2'>
                        <img className='w-18 h-full  rounded-md ml-20' src={TeamLogo} alt="TeamLogo"/>

                        <div className='p-5 text-md text-white ml-20'>Why Team Communication</div>

                        <div className='p-5 text-md text-white ml-20'>About Us</div>

                        <div className='p-5 text-md text-white ml-20'>SignUp</div>
                        

                        <div className='p-5 text-md text-white ml-20'>SignIn</div>

                        <div className='ml-20'><UserButton/></div>
                    </nav>
                </div>
                <div>
                    <div className='text-center'>
                        <div className='text-black text-5xl mt-10 font-bold'>Where Work Meets Efficiency</div>

                        <div className='text-xl mt-10 font-mono'>Simplify collaboration, reduce distractions, and stay focused on what matters. Our platform is designed to streamline communication and help your team get more done—in less time.</div>
                    </div>
                </div>
            </div>
            
        </>
    )
}