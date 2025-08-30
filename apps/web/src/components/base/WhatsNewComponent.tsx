import { cn } from '@/lib/utils';
import { Boldonse } from 'next/font/google';
import Image from 'next/image';
import { FaCommentAlt, FaGift, FaLocationArrow, FaQuestion, FaStar } from 'react-icons/fa';
import { AlarmClock } from '../ui/animated-icons/AlarmClock';
import { BsTrophyFill } from 'react-icons/bs';
import ToolTipComponent from '../utility/TooltipComponent';

const boldonse = Boldonse({
    weight: '400',
    subsets: ['latin'],
});

export default function WhatsNewComponent() {
    return (
        <div className="w-full flex h-auto mt-50 select-none">
            <div
                className={cn(
                    'w-full max-w-[40%]',
                    `${boldonse.className} text-[30px] tracking-wider relative text-[#e4e4e4]`,
                )}
            >
                {"WHAT'S IN IT FOR YOU"}
            </div>

            <div className="w-full max-w-[60%] flex justify-center">
                {/* outer card */}
                <div className="w-[550px] h-[350px] border rounded-3xl flex justify-center items-center bg-gradient-to-b from-neutral-950 via-neutral-900 to-neutral-950 relative">
                    <FaStar className="absolute top-10 left-22 text-white/10 w-8 h-8 rotate-12 hover:text-[#FF5C7D] hover:scale-105 hover:rotate-6 transition-all transform duration-200" />
                    <FaCommentAlt className="absolute top-40 right-10 text-white/15 w-7 h-7 -rotate-20 hover:text-[#b4b4b4] hover:scale-105 hover:-rotate-15 transition-all transform duration-200" />
                    <FaGift className="absolute top-16 right-36 text-white/10 w-10 h-10 -rotate-12 hover:text-[#4A7EBE] hover:scale-105 hover:-rotate-6 transition-all transform duration-200" />
                    <FaQuestion className="absolute bottom-12 right-60 text-white/15 w-7 h-7 rotate-25 hover:text-[#BA832A] hover:scale-105 hover:rotate-20 transition-all transform duration-200" />
                    <BsTrophyFill className="absolute bottom-25 left-15 text-white/15 w-8 h-8 -rotate-12 hover:text-[#522B89] hover:scale-105 hover:-rotate-6 transition-all transform duration-200" />

                    {/* small card */}
                    <div className="flex gap-x-3 border px-5 py-3 rounded-full shadow-xl bg-gradient-to-br from-neutral-950 via-neutral-800 to-neutral-950 hover:scale-105 transition-all transform-3d duration-200 ease-in-out">
                        <div className="h-10 w-10 rounded-full border overflow-hidden flex justify-center items-center">
                            <Image
                                src={'https://dejbzabt9zak1.cloudfront.net/avatars/avatar-17.jpg'}
                                alt="James"
                                width={100}
                                height={100}
                                unoptimized
                            />
                        </div>

                        <div className="flex justify-center items-center text-md">James Harrid</div>
                    </div>

                    {/* first */}
                    <div className="absolute top-20 left-26 bg-[#03AAAA] px-3 py-1.5 rounded-full font-semibold text-black hover:-translate-y-0.5 transition-all duration-150 shadow-xl">
                        Correct answer
                    </div>
                    <div className="absolute top-26 left-58 rotate-90 text-[#03AAAA] px-3 py-1.5 rounded-full font-semibold">
                        <FaLocationArrow />
                    </div>

                    {/* second */}
                    <div className="absolute bottom-20 left-37 bg-[#ebebeb] px-3 py-1.5 rounded-full font-semibold text-black hover:-translate-y-0.5 transition-all duration-150 shadow-xl">
                        Win
                    </div>
                    <div className="absolute bottom-26 left-47 rotate-1 text-[#ebebeb] px-3 py-1.5 rounded-full font-semibold">
                        <FaLocationArrow />
                    </div>

                    {/* third */}
                    <div className="absolute bottom-22 right-20 bg-[#FFE95C] px-3 py-1.5 rounded-full font-semibold text-black hover:-translate-y-0.5 transition-all duration-150 shadow-xl">
                        Lifeline
                    </div>
                    <div className="absolute bottom-28 right-36 -rotate-90 text-[#FFE95C] px-3 py-1.5 rounded-full font-semibold">
                        <FaLocationArrow />
                    </div>

                    <div className="h-55 w-30 absolute -left-10 p-1 -top-5 flex flex-col gap-1 bg-neutral-950 rounded-2xl border">
                        <div className="w-full h-full border rounded-2xl justify-center items-center bg-neutral-900 flex flex-col">
                            <AlarmClock className="h-10 w-10" />
                        </div>

                        <div
                            className={cn(
                                `w-full h-full border text-[25px] rounded-2xl bg-neutral-900`,
                                `${boldonse.className} leading-10 tracking-wide`,
                                'flex-col flex justify-center items-center text-center text-[#e4e4e4]',
                            )}
                        >
                            WIN IN <span className="text-[#BA832A]">TIME</span>
                        </div>
                    </div>

                    <div className="h-auto w-auto absolute -right-8 p-1.5 top-5 flex flex-col gap-1.5 bg-neutral-950 rounded-2xl border">
                        <div className="w-10 h-10 border rounded-full justify-center items-center bg-neutral-900 flex flex-col overflow-hidden hover:scale-105 transition-transform duration-200">
                            <Image
                                src={'https://dejbzabt9zak1.cloudfront.net/avatars/avatar-10.jpg'}
                                alt="James"
                                width={100}
                                height={100}
                                unoptimized
                            />
                        </div>
                        <div className="w-10 h-10 border rounded-full justify-center items-center bg-neutral-900 flex flex-col overflow-hidden hover:scale-105 transition-transform duration-200">
                            <Image
                                src={'https://dejbzabt9zak1.cloudfront.net/avatars/avatar-15.jpg'}
                                alt="James"
                                width={100}
                                height={100}
                                unoptimized
                            />
                        </div>
                        <div className="w-10 h-10 border rounded-full justify-center items-center bg-neutral-900 flex flex-col overflow-hidden hover:scale-105 transition-transform duration-200">
                            <Image
                                src={'https://dejbzabt9zak1.cloudfront.net/avatars/avatar-7.jpg'}
                                alt="James"
                                width={100}
                                height={100}
                                unoptimized
                            />
                        </div>
                        <div className="w-10 h-10 border rounded-full justify-center items-center bg-neutral-900 flex flex-col overflow-hidden hover:scale-105 transition-transform duration-200">
                            <Image
                                src={'https://dejbzabt9zak1.cloudfront.net/avatars/avatar-5.jpg'}
                                alt="James"
                                width={100}
                                height={100}
                                unoptimized
                            />
                        </div>
                        <ToolTipComponent content="Yupp! Scalability is not an issue">
                            <div className="w-10 h-10 border rounded-full justify-center items-center bg-neutral-900 text-[#BA832A] font-semibold tracking-wide flex text-center align-middle text-xs overflow-hidden hover:scale-105 transition-transform duration-200">
                                +10K
                            </div>
                        </ToolTipComponent>
                    </div>
                    {/* <div className="w-20 h-20 absolute bottom-8 -right-12 border rounded-full justify-center items-center bg-neutral-900 flex flex-row gap-1 text-sm overflow-hidden text-white">
                        <IoPeople className="w-10 h-10" />
                    </div> */}
                </div>
            </div>
        </div>
    );
}
