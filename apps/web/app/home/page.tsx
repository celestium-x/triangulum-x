import DashBoard from '@/components/base/DashBoard';
import HomeNavbar from '@/components/navbars/HomeNavbar';

export default function Home() {
    return (
        <div className="h-screen w-full bg-light-base dark:bg-dark-primary">
            <HomeNavbar />
            <DashBoard />
        </div>
    );
}
