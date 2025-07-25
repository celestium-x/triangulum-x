"use client"
import { useEffect, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import ToolTipComponent from "../utility/TooltipComponent";
import { IoIosPlay } from "react-icons/io";
import { CiSaveDown1 } from "react-icons/ci";
import { MdPublish } from "react-icons/md";
import CreateQuizActionPanel from "../utility/CreateQuizActionPanel";
import BackendActions from "@/lib/backend/upsertQuizAction";
import { useUserSessionStore } from "@/store/user/useUserSessionStore";
import { useNewQuizStore } from "@/store/new-quiz/useNewQuizStore";

interface Option {
    name: string,
    description?: string,
    icon: React.ReactNode
    action?: () => void | Promise<void>
}

export default function NavbarQuizAction() {
    const [actionsPanel, setActionsPanel] = useState<boolean>(false);
    const [currentAction, setCurrentAction] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const { session } = useUserSessionStore();
    const { quiz } = useNewQuizStore();
    async function handleSaveDraft() {
        if (!quiz || !session?.user.token) {
            console.error("Quiz or token is missing");
            return;
        }
        setIsLoading(true);
        try {
            console.log("making backend call")
            await BackendActions.upsertQuizAction(quiz, session.user.token);
            console.log("done-------------------->")
            console.log("Quiz saved successfully");
        } catch (error) {
            console.error("Failed to save quiz:", error);
        } finally {
            setIsLoading(false);
        }
    };

    const options: Option[] = [
        {
            name: "Launch Quiz",
            icon: <IoIosPlay size={'24px'} />
        },
        {
            name: "Save Draft",
            description: "Store your progress — you can edit and publish it later",
            icon: <CiSaveDown1 size={'24px'} />,
            action: handleSaveDraft
        },
        {
            name: "Publish Quiz",
            description: "Make your quiz live and shareable with participants",
            icon: <MdPublish size={'24px'} />
        }
    ];

    useEffect(() => {
        // Auto-save functionality (commented out for now)
        // const interval = setInterval(() => {
        //     handleSaveDraft();
        // }, 30 * 1000); // 30 seconds
        // return () => {
        //     clearInterval(interval);
        // }
    }, [])

    return (
        <div
            className="relative select-none"
            onClick={() => setActionsPanel(prev => !prev)}
        >
            <ToolTipComponent content={"this will be saved every 30sec"} >
                <div className="w-full flex justify-around items-center gap-x-2 bg-primary/50 transition-colors rounded-full cursor-pointer px-4 py-2 ">
                    <div className="rounded-l-full text-[13px] font-normal flex justify-center items-center ">
                        {isLoading ? "Saving..." : (currentAction ?? options[1]?.name)}
                    </div>
                    <div className="rounded-r-full text-[13px] flex justify-center items-center ">
                        <SlArrowDown
                            className={`${actionsPanel ? "rotate-180" : ""} transition-all`}
                        />
                    </div>
                </div>
            </ToolTipComponent>
            {actionsPanel && (
                <CreateQuizActionPanel
                    setCurrentAction={setCurrentAction}
                    actions={options}
                    setActionsPanel={setActionsPanel}
                />
            )}
        </div>
    );
}