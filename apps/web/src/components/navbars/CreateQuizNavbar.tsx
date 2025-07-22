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
                    <DarkModeToggle />
                    <NavbarQuizAction />
                    <ProfileMenu />
                </div>
            </div>
        </div>
    );
}