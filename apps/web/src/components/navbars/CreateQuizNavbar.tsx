import AppLogo from "../app/AppLogo";
import DarkModeToggle from "../base/DarkModeToggle";
import NavbarQuizAction from "./NavbarQuizAction";


export default function CreateQuizNavbar() {
    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2  w-full max-w-4xl px-4 py-4 rounded-lg shadow-lg border bg-light-base dark:bg-dark-base">
            <div className="px-4 flex items-center justify-between w-full">
                <AppLogo />

                <div className="flex items-center">
                    <DarkModeToggle />
                    <NavbarQuizAction />
                </div>
            </div>
        </div>
    );
}