import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { Tooltip } from "@/components/ui/tooltip";
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { CircleMinus } from "lucide-react";
import { Link } from "react-router-dom";
import { Hint } from "../Hint/Hint";
import { useRemoveMember } from "@/hooks/apis/workspace/useRemoveMember";

const userItemVariants = cva(
    'flex items-center gap-1.5 justify-start font-normal h-7 px-4 mt-2 text-sm',
    {
        variants: {
            variant: {
                default: 'text-[#f9edffcc]',
                active: 'text-[#481350] bg-white/90 hover:bg-white/80'
            }
        },
        defaultVariants: 'default'
    }
);

export const UserItem = (
    id,
    variant
) => {

    const {currentWorkspace} = useCurrentWorkspace();

    const { removeMemberMutation } = useRemoveMember(currentWorkspace?._id, id.id);
    console.log('wid', currentWorkspace?._id);
    console.log('id uit', id.id)
    console.log('label', id.label)
    console.log('img', id.image);

    async function removeHandler(){
        const ok = confirm("Are you want to remove Member from workspace");

        if(!ok) {
            return;
        }

        await removeMemberMutation();
    }
    return (
        // <Button
        // className={cn(userItemVariants({variant}))}
        // variant='transparent'
        // size='sm'
        // asChild
        // >
        <div className='flex'>
           <Link to={`/workspace/${currentWorkspace?._id}/members/${id.id}`}>
           <div className='flex'>
            <Avatar>
                <AvatarImage src={id.image} className='rounded-md'/>
                <AvatarFallback className='rounded-md bg-sky-500 text-white'>
                    {id.label.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <span>
                {id.label}
            </span>
           </div>
            
            </Link>
           <Hint label="Remove Member">
            <Button
            variant="transparent"
            className=''
            onClick={removeHandler}
            >
                <CircleMinus/>
            </Button>
            </Hint>
            
        </div>
            
            
        // </Button>
    )
}