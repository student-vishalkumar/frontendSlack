import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { useCurrentWorkspace } from "@/hooks/context/useCurrentWorkspace";
import { cn } from "@/lib/utils";
import { cva } from "class-variance-authority";
import { Link } from "react-router-dom";

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
    console.log('wid', currentWorkspace);
    console.log('id uit', id.id)
    console.log('label', id.label)
    console.log('img', id.image);
    return (
        <Button
        className={cn(userItemVariants({variant}))}
        variant='transparent'
        size='sm'
        asChild
        >
            <Link to={`/workspace/${currentWorkspace?._id}/members/${id.id}`}>
            <Avatar>
                <AvatarImage src={id.image} className='rounded-md'/>
                <AvatarFallback className='rounded-md bg-sky-500 text-white'>
                    {id.label.charAt(0).toUpperCase()}
                </AvatarFallback>
            </Avatar>
            <span>
                {id.label}
            </span>
            </Link>
        </Button>
    )
}