'use client';
import { IoMdArrowRoundForward } from 'react-icons/io';
import FeatureBoxComponent from '../ui/FeatureBoxComponent';
import { SlidersVertical } from '../ui/animated-icons/SildesVertical';

export default function FeatureBox() {
    return (
        <div className="w-full flex justify-center mt-40">
            <FeatureBoxComponent
                title="Quiz"
                description="This is the quiz description, nothing is like this quiz. best quiz"
                buttonText="START QUIZ"
                buttonIcon={<IoMdArrowRoundForward />}
                backgroundSvg={(hovered: boolean) => (
                    <SlidersVertical
                        strokeWidth={0.1}
                        height={200}
                        width={200}
                        animateState={hovered ? 'animate' : 'normal'}
                    />
                )}
            />

            <FeatureBoxComponent
                title="Quiz"
                description="This is the quiz description, nothing is like this quiz. best quiz"
                buttonText="START QUIZ"
                buttonIcon={<IoMdArrowRoundForward />}
                backgroundSvg={(hovered: boolean) => (
                    <SlidersVertical
                        strokeWidth={0.1}
                        height={200}
                        width={200}
                        animateState={hovered ? 'animate' : 'normal'}
                    />
                )}
            />

            <FeatureBoxComponent
                title="Quiz"
                description="This is the quiz description, nothing is like this quiz. best quiz"
                buttonText="START QUIZ"
                buttonIcon={<IoMdArrowRoundForward />}
                backgroundSvg={(hovered: boolean) => (
                    <SlidersVertical
                        strokeWidth={0.1}
                        height={200}
                        width={200}
                        animateState={hovered ? 'animate' : 'normal'}
                    />
                )}
            />
        </div>
    );
}
