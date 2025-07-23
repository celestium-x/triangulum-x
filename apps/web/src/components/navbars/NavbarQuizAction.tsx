"use client"
import { useEffect, useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import ToolTipComponent from "../utility/TooltipComponent";
import { IoIosPlay } from "react-icons/io";
import { CiSaveDown1 } from "react-icons/ci";
import { MdPublish } from "react-icons/md";
import CreateQuizActionPanel from "../utility/CreateQuizActionPanel";

interface action {
    name: string,
    description?: string,
    icon: React.ReactNode
}

const actions: action[] = [
    {
        name: "Launch Quiz",
        icon: <IoIosPlay size={'24px'} />
    },
    {
        name: "Save Draft",
        description: "Store your progress — you can edit and publish it later",
        icon: <CiSaveDown1 size={'24px'} />
    },
    {
        name: "Publish Quiz",
        description: "Make your quiz live and shareable with participants",
        icon: <MdPublish size={'24px'} />
    }
]

const SECONDS = 1000;

export default function NavbarQuizAction() {
    const [actionsPanel, setActionsPanel] = useState<boolean>(false);
    const [currentAction, setCurrentAction] = useState<string | null>(null);

    useEffect(() => {
        const interval = setInterval(() => {
            //backend call to update the quiz automatically
            console.log("backend call made");
        }, 3 * SECONDS)
        return () => {
            clearInterval(interval);
        }
    }, [])

    return (
        <div
            className="relative select-none"
            onClick={() => setActionsPanel(prev => !prev)}
        >
            <ToolTipComponent content={"this will be saved every 30sec"} >
                <div className="w-full flex justify-around items-center gap-x-2 bg-primary/50 transition-colors rounded-full cursor-pointer px-4 py-2 ">
                    <div className="rounded-l-full text-[13px] font-normal flex justify-center items-center ">
                        {currentAction ?? actions[1]?.name}
                    </div>
                    <div className="rounded-r-full text-[13px] flex justify-center items-center ">
                        <SlArrowDown
                            className={`${actionsPanel ? "rotate-180" : ""} transition-all`}
                        />
                    </div>
                </div>
            </ToolTipComponent>
            {actionsPanel && <CreateQuizActionPanel setCurrentAction={setCurrentAction} actions={actions} setActionsPanel={setActionsPanel} />}
        </div>
    );
}