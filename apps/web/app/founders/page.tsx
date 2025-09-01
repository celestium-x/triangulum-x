<<<<<<< HEAD
import HomeScreenFooter from '@/components/base/HomeScreenFooter';
import FounderBase from '@/components/developers/FounderBase';

export default function Founders() {
    return (
        <div className="relative w-screen h-screen">
            <FounderBase />
            <HomeScreenFooter />
=======
import FounderBase from '@/components/founders/FounderBase';

export default function Founders() {
    return (
        <div className="max-w-screen h-screen custom-scrollbar">
                <FounderBase />
>>>>>>> b17b205 (ui: founders page complete)
        </div>
    );
}
