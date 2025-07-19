import { TbPlus } from "react-icons/tb";
import HeadAndSubHead from "../content/HeadAndSubHead";
import UtilityCard from "../utility/UtilityCard";
import Image from "next/image";
import { DiCoda } from "react-icons/di";
import { CiBatteryFull } from "react-icons/ci";

export default function HomeCreateQuiz() {
    return (
        <div className="flex flex-col items-start justify-start p-2">
            <HeadAndSubHead
                heading="Create Quiz"
                subHeading="Manage your quizzes, analytics, and more"
            />

            <div className="mt-4">
                <UtilityCard className="min-w-[20rem] min-h-[10rem] max-w-[20rem] max-h-[10rem] flex flex-col items-center justify-center rounded-xl shadow-md border border-dashed cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg hover:scale-[1.02] hover:-translate-y-0.5 group">
                    <div className="flex items-center justify-center gap-x-2">
                        <TbPlus size={16} />
                        <span className="text-sm dark:text-neutral-300 text-neutral-800 font-light">
                            Create Quiz
                        </span>
                    </div>
                </UtilityCard>
            </div>

            <div className="grid grid-cols-2 gap-4 mt-4 w-full">
                <UtilityCard className="min-w-[20rem] min-h-[18rem] max-h-[18rem] shadow-md border border-dashed cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg relative overflow-hidden p-0 rounded-xl">
                    <div className="absolute inset-0">
                        <Image
                            src="/images/test.jpg"
                            alt="test"
                            className="object-cover scale-110"
                            fill
                            unoptimized
                        />
                    </div>
                    <div className="absolute bg-primary inset-0 w-[85%] rounded-tr-[4rem] z-10">
                        <div className="relative flex flex-col items-start justify-center px-12 gap-y-6 text-light-base dark:text-dark-primary h-full -mt-4">
                            <CiBatteryFull size={32} className="absolute top-10 right-10 dark:text-dark-primary text-light-base" />
                            <div className="relative z-50 text-3xl font-bold">Quiz Builder</div>
                            <div className="relative z-50 text-sm font-light">
                                Design interactive quizzes using our intuitive builder.
                                Add questions, set timers, assign scores, and more — all in one place.
                            </div>
                        </div>
                    </div>
                </UtilityCard>

                <UtilityCard className="min-w-[20rem] min-h-[18rem] max-h-[18rem] shadow-md border border-dashed cursor-pointer transition-all duration-300 ease-in-out hover:shadow-lg grid-cols-1 relative overflow-hidden rounded-xl">
                    <div className="absolute inset-0 rounded-xl overflow-hidden">
                        <Image
                            src="/images/test2.jpg"
                            alt="test"
                            className="object-cover scale-110"
                            fill
                            unoptimized
                        />
                    </div>
                    <div className="absolute bg-orange-500 inset-0 w-[85%] rounded-tr-[4rem] z-10">
                        <div className="relative flex flex-col items-start justify-center px-12 gap-y-6 text-light-base dark:text-dark-primary h-full -mt-4">
                            <DiCoda size={32} className="absolute top-10 right-10 dark:text-dark-primary text-light-base" />
                            <div className="relative z-50 text-3xl font-bold">Performance Insights</div>
                            <div className="relative z-50 text-sm font-light">
                                Track how your quizzes are performing in real-time.
                                See completion rates, average scores, and detailed user stats.
                            </div>
                        </div>
                    </div>
                </UtilityCard>
            </div>
        </div>
    );
}
