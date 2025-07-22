"use client"

import { cn } from "@/lib/utils";
import { useState } from "react";
import { SlArrowDown } from "react-icons/sl";
import ToolTipComponent from "../utility/TooltipComponent";
import UtilityCard from "../utility/UtilityCard";
import { IoIosPlay } from "react-icons/io";
import { CiSaveDown1 } from "react-icons/ci";
import { IoDocumentSharp } from "react-icons/io5";

interface action {
    name: string,
    description: string,
    icon: React.ReactNode
}

const actions: action[] = [
    {
        name: "Launch Quiz",
        description: "launch your quiz now.",
        icon: <IoIosPlay size={'24px'} />
    },
    {
        name: "Save Draft",
        description: "save your quiz for later.",
        icon: <CiSaveDown1 size={'24px'} />
    },
    {
        name: "Publish Quiz",
        description: "publish your quiz now.",
        icon: <IoDocumentSharp size={'20px'} />
    }
]

export default function NavbarQuizAction() {

    const [actionsPanel, setActionsPanel] = useState<boolean>(false);
    const [currentAction, setCurrentAction] = useState<string | null>(null);

    return (
        <div
            className="relative select-none"
            onClick={() => setActionsPanel(prev => !prev)}
        >
            <ToolTipComponent content={"this will be saved every 30sec"} >
                <div className="w-full flex justify-around items-center gap-x-2 bg-dark-base hover:bg-dark-primary dark:bg-light-base hover:dark:bg-light-base text-light-base dark:text-dark-base transition-colors rounded-full cursor-pointer px-4 py-2 ">
                    <div className="h-2 w-2 rounded-full bg-green-600"></div>
                    <div className="rounded-l-full text-[13px] flex justify-center items-center ">
                        {currentAction ?? actions[1]?.name}
                    </div>
                    <div className="rounded-r-full text-[13px] flex justify-center items-center ">
                        <SlArrowDown
                            className={`${actionsPanel ? "rotate-180" : ""} transition-all`}
                        />
                    </div>
                </div>
            </ToolTipComponent>
            {
                actionsPanel && <UtilityCard className="absolute z-[999] top-10 right-0 w-70 p-0 dark:bg-dark-base bg-light-base dark:text-light-base text-dark-base rounded-xl flex flex-col justify-start items-start overflow-hidden shadow-lg ">
                    {actions.map((action, index) => (
                        <div
                            className={cn(
                                "w-full hover:dark:bg-dark-primary hover:bg-light-base transition-colors flex justify-start items-center px-4 gap-x-3 ",
                                `${index === 0 ? "pt-6 pb-4" : ""}`,
                                `${index === actions.length - 1 ? "pb-6 pt-4" : "py-4"}`
                            )}
                            key={index}
                            onClick={() => setCurrentAction(action.name)}
                        >
                            <div>
                                {action.icon}
                            </div>
                            <div className="flex flex-col ">
                                <div className="">
                                    {action.name}
                                </div>
                                <div className={`text-[13px] text-gray-500 ${index !== actions.length - 1 && ""}`}>
                                    {action.description}
                                </div>
                            </div>
                            {/* {index < actions.length - 1 && <div className="w-full border-t dark:border-dark-base border-white"></div>} */}
                        </div>
                    ))}
                </UtilityCard>
            }
        </div>
    );
}