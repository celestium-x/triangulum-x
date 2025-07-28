import { Button } from '../ui/button';
import { RiUserFill } from 'react-icons/ri';
import { SiSolana } from 'react-icons/si';

export default function DashboardStakedAmountCard() {
    return (
        <div className="flex-1 p-12">
            <div className="bg-primary h-full max-h-[24rem] rounded-4xl p-6 relative overflow-hidden">
                <div className="flex flex-col justify-between h-full">
                    <div className="w-full flex items-center justify-between">
                        <div>
                            <h2 className="text-white text-xl font-semibold">Staked Amount</h2>
                            <span className="font-light text-sm text-white/70">
                                updated 1 day ago
                            </span>
                        </div>
                        <Button
                            variant={'ghost'}
                            className="rounded-full px-4 py-2 dark:bg-dark-primary hover:dark:bg-dark-primary/80 text-base font-light"
                        >
                            monthly
                        </Button>
                    </div>
                    <div className="flex items-end justify-between">
                        <div className="flex justify-between flex-col gap-y-3">
                            <div className="flex items-center gap-x-2 text-white/80">
                                <span className="font-light">Participants</span>
                                <RiUserFill />
                            </div>
                            <div>
                                <span className="text-6xl font-black text-white">1,200</span>
                            </div>
                        </div>

                        <div className="flex justify-between flex-col gap-y-3 group">
                            <div className="flex items-center justify-end gap-x-2 text-white/80">
                                <span className="font-light">Staked amount</span>
                                <div className="relative">
                                    <SiSolana className="transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
                                </div>
                            </div>
                            <div className="relative">
                                <div className="bg-black/70 hover:bg-black/80 backdrop-blur-sm rounded-xl px-6 py-2 border border-white/10 transition-all duration-300 group-hover:bg-white/10 group-hover:border-white/20 group-hover:shadow-lg group-hover:shadow-yellow-400/10">
                                    <span className="text-6xl font-black text-white relative">
                                        0.02 SOL
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
