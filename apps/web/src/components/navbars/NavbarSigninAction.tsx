'use client'
import { MdChevronRight } from "react-icons/md"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { useState } from "react";
import LoginModal from "../utility/LoginModal";
import { useUserSessionStore } from "@/store/user/useUserSessionStore";
import { useRouter } from "next/navigation";


export default function NavbarSigninAction() {
    const { session } = useUserSessionStore();
    const router = useRouter();
    const [opensignInModal, setOpenSignInModal] = useState<boolean>(false);

    function handler() {
        if (!session?.user.token) {
            setOpenSignInModal(true)
        } else {
            router.push("/home");
        }
    }

    return (
        <div className="">
            <Button onClick={handler} className={cn("font-light text-[13px] tracking-wide flex items-center justify-center transition-transform hover:-translate-y-0.5 cursor-pointer z-[10] pr-1 rounded-lg",
                "bg-dark-base dark:bg-light-base dark:hover:bg-light-base hover:bg-dark-base"
            )}>
                <span>{
                    session?.user ? "Go to app" : "Sign in"
                }</span>
                <MdChevronRight className="text-neutral-300 dark:text-dark-base" />
            </Button>
            <LoginModal opensignInModal={opensignInModal} setOpenSignInModal={setOpenSignInModal} />
        </div>
    )
}