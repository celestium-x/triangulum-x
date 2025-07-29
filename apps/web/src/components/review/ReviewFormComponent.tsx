import { Dispatch, SetStateAction } from "react";
import OpacityBackground from "../utility/OpacityBackground";
import UtilityCard from "../utility/UtilityCard";






export default function ReviewFormComponent({ }) {
    return (
        <div>
            {(
                <OpacityBackground >
                    <UtilityCard>
                        <div className="relative min-h-screen bg-gradient-to-b from-green-900 to-black overflow-hidden">
                            {/* Light effect at top center */}
                            <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-[600px] h-[600px] bg-green-400 opacity-20 rounded-full blur-3xl pointer-events-none" />

                            {/* Background REVIEW text */}
                            <div className="absolute inset-0 flex items-center justify-center">
                                <h1 className="text-[150px] font-extrabold text-white opacity-5 tracking-widest select-none">
                                    REVIEW
                                </h1>
                            </div>
                        </div>

                    </UtilityCard>



                </OpacityBackground>
            )}



        </div>
    )

}