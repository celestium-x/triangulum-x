'use client';
import DashboardStakedAmountCard from '../utility/DashboardStakedAmountCard';
import InvertedQuizCards from '../utility/InvertedQuizCards';

export default function HomeDashboard() {
    return (
        <div className="relative top-4 h-full w-full border rounded-xl overflow-hidden select-none flex gap-2">
            <div className="w-[40rem] h-full border-r flex flex-col relative">
                <InvertedQuizCards />

                <div className="absolute bottom-0 w-full px-3 py-3">
                    <DashboardStakedAmountCard />
                </div>
            </div>

            <div className="w-full h-full flex flex-col space-y-3 p-8 text-7xl relative">
                <div className="w-full h-[45%] flex flex-col space-y-3">
                    <div className="flex w-full h-full space-x-3">
                        <div className="bg-[#141921] h-full w-full flex flex-col rounded-xl p-6">
                            <div className="w-full flex flex-col gap-y-3 pt-6 px-3">
                                <span className="text-[30px] font-medium tracking-wider">
                                    Create
                                </span>
                                <span className="text-[20px] font-normal leading-6 tracking-wide">
                                    The only quiz game where your knowledge isn&apos;t just power,{' '}
                                    <span className="text-[#2563EB] font-medium">it&apos;s profit</span>
                                </span>
                            </div>
                        </div>

                        <div className="bg-[#141f18] h-full w-full flex flex-col gap-y-3 rounded-xl p-6">
                            <div className="w-full flex flex-col gap-y-3 pt-6 px-3">
                                <span className="text-[30px] font-medium tracking-wider">
                                    Stake
                                </span>
                                <span className="text-[20px] font-normal leading-6 tracking-wide">
                                    The only quiz game where your knowledge isn&apos;t just power,{' '}
                                    <span className="text-[#16A34A] font-medium">it&apos;s profit</span>
                                </span>
                            </div>
                        </div>
                    </div>

                    <div className="flex w-full h-full space-x-3">
                        <div className="bg-[#15201f] h-full w-full flex flex-col gap-y-3 rounded-xl p-6">
                            <div className="w-full flex flex-col gap-y-3 pt-6 px-3">
                                <span className="text-[30px] font-medium tracking-wider">
                                    Participate
                                </span>
                                <span className="text-[20px] font-normal leading-6 tracking-wide">
                                    The only quiz game where your knowledge isn&apos;t just power,{' '}
                                    <span className="text-[#0D9488] font-medium">it&apos;s profit</span>
                                </span>
                            </div>
                        </div>

                        <div className="bg-[#211d11] h-full w-full flex flex-col gap-y-3 rounded-xl p-6">
                            <div className="w-full flex flex-col gap-y-3 pt-6 px-3">
                                <span className="text-[30px] font-medium tracking-wider">Win</span>
                                <span className="text-[20px] font-normal leading-6 tracking-wide">
                                    The only quiz game where your knowledge isn&apos;t just power,{' '}
                                    <span className="text-[#CA8A04] font-medium">it&apos;s profit</span>
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
