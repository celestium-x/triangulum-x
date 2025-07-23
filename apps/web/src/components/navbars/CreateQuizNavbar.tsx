import AppLogo from "../app/AppLogo";
import DarkModeToggle from "../base/DarkModeToggle";
import ProfileMenu from "../utility/ProfileMenu";
import NavbarQuizAction from "./NavbarQuizAction";

export interface CreateQuizNavBarProps {
    quizId: string
}

export default function CreateQuizNavBar() {

    return (
        <div className="w-full h-20 bg-light-base dark:bg-dark-base/30 flex items-center justify-between px-12">
            <div className="px-4 flex items-center justify-between w-full">
                <AppLogo />

                <div className="flex items-center gap-x-5">
                    <div className="flex items-center gap-x-2">
                        <div className="h-2 w-2 rounded-full bg-green-600"></div>
                        <span className="text-neutral-500 dark:text-neutral-400 text-xs underline cursor-pointer">auto save is on</span>
                    </div>
                    <DarkModeToggle />
                    <NavbarQuizAction />
                    <ProfileMenu />
                </div>
            </div>
        </div>
    );
}