import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"

export const Hint = ({side, align, label, children}) => {
    return (
        <TooltipProvider>
            <Tooltip>
                <TooltipTrigger asChild>
                    {children}
                </TooltipTrigger>

                <TooltipContent
                side={side}
                align={align}
                className='bg-black text-white p-2 rounded-lg border border-white'
                >
                <p className='text-sm font-medium'> 
                    {label}
                </p>
                </TooltipContent>
            </Tooltip>
        </TooltipProvider>
    )
}