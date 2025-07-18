'use client'

import { MdChevronRight } from "react-icons/md"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react";
import LoginModal from "../utility/LoginModal";


export default function NavbarSigninAction() {
    const [opensignInModal, setOpenSignInModal] = useState<boolean>(false);
    return (
        <>
            <Button onClick={() => setOpenSignInModal(true)} className={cn("font-normal text-sm tracking-wider flex items-center justify-center transition-transform hover:-translate-y-0.5 cursor-pointer z-[10]",
                "bg-dark-base dark:bg-light-base dark:hover:bg-light-base hover:bg-dark-base"
            )}>

                <span>Sign in</span>
                <MdChevronRight className="text-neutral-300 dark:text-dark-base" />
            </Button>
            <LoginModal opensignInModal={opensignInModal} setOpenSignInModal={setOpenSignInModal} />
        </>
    )
}