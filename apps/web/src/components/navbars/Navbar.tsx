import AppLogo from "../app/AppLogo";
import { Button } from "../ui/button";
import { MdChevronRight } from "react-icons/md";


export default function Navbar() {

    return (
        <div className="absolute top-4 left-1/2 -translate-x-1/2  w-full max-w-5xl px-4 py-4 rounded-lg shadow-lg border">
            <div className="mx-4 flex items-center justify-between">
                <AppLogo />
                <Button className="font-light text-sm tracking-wider bg-dark-base flex items-center justify-center">
                    <span>Sign in</span>
                    <MdChevronRight className="text-neutral-300" />
                </Button>
            </div>
        </div>
    );
}
