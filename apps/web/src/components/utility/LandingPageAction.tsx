"use client"
import { MdChevronRight } from "react-icons/md"
import { Button } from "../ui/button"
import { cn } from "@/lib/utils"
import { useUserSessionStore } from "@/store/user/useUserSessionStore"
import { useRouter } from "next/navigation"
import { v4 as uuid } from "uuid";
import LoginModal from "./LoginModal"
import { useState } from "react"


export default function LandingPageAction() {
    const { session } = useUserSessionStore();
    const router = useRouter();
    const [opensignInModal, setOpenSignInModal] = useState<boolean>(false);

    function handleRedirect() {
        if (!session?.user) {
            setOpenSignInModal(true);
            return;
        }

        const newUuid = uuid();
        router.push(`new/${newUuid}`);
    }

    return (
        <div className="flex gap-4">
            <Button className={cn("font-light text-sm tracking-wider  flex items-center justify-center transition-transform hover:-translate-y-0.5 cursor-pointer z-[10]",
                "bg-dark-base dark:bg-light-base"
            )}>

                <span>{session?.user ? "Go to app" : "Sign In"}</span>
                <MdChevronRight className="text-neutral-300 dark:text-dark-base" />
            </Button>
            <Button
                onClick={handleRedirect}
                className={cn("font-light text-sm tracking-wider flex items-center justify-center transition-transform hover:-translate-y-0.5 cursor-pointer z-[10]",
                    "dark:bg-dark-base bg-light-base hover:bg-light-base text-dark-base dark:text-light-base border border-neutral-300 dark:border-[1px] dark:border-neutral-700"
                )}>

                <span>Start creating</span>
                <MdChevronRight className="text-neutral-300 dark:text-dark-base" />
            </Button>
            <LoginModal opensignInModal={opensignInModal} setOpenSignInModal={setOpenSignInModal} />
        </div>
    )
}