'use client';

import { DraftRenderer, useDraftRendererStore } from '@/store/new-quiz/useDraftRendererStore';
import { RxCross2 } from 'react-icons/rx';
import Options from './Options';
import ToolTipComponent from '@/components/utility/TooltipComponent';
import { AiOutlineQuestionCircle } from 'react-icons/ai';
import { Input } from '@/components/ui/input';
import { useNewQuizStore } from '@/store/new-quiz/useNewQuizStore';
import { useEffect, useRef, useState } from 'react';
import { getSingletonPointsCalculator } from '@/lib/singleton-points-calculator';
import { IoIosInfinite } from 'react-icons/io';
import UploadQuizImage from './UploadQuizImage';

export default function QuestionsDraft() {
    const { setState } = useDraftRendererStore();
    const { quiz, currentQuestionIndex, changeQuestionPoint, getQuestion } = useNewQuizStore();
    const currentQ = quiz.questions[currentQuestionIndex];

    const [basePoints, setBasePoints] = useState<string>(currentQ?.basePoints.toString() || '0');
    const singletonPointsCalculator = getSingletonPointsCalculator(quiz.questions.length);
    const [wrongBasePoints, setWrongBasePoints] = useState<boolean>(false);
    const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

    function handleBasePointsChange(e: React.ChangeEvent<HTMLInputElement>) {
        const value = Number(e.target.value);
        if (value < 0 || isNaN(value)) return;

        setBasePoints(value.toString());
        changeQuestionPoint(currentQuestionIndex, value);
        handleUpdateQuestionPoints(currentQuestionIndex, value);

        if (timerRef.current) {
            clearTimeout(timerRef.current);
        }

        timerRef.current = setTimeout(() => {
            const prev = getQuestionPoints(currentQuestionIndex - 1) || 0;
            const next = getQuestionPoints(currentQuestionIndex + 1) ?? Infinity;

            if (value === 0 || value < prev || value > next) {
                setWrongBasePoints(true);
            } else {
                setWrongBasePoints(false);
            }
        }, 2000);

        setWrongBasePoints(false);
    }
    function handleUpdateQuestionPoints(questionIndex: number, point: number) {
        const points: number[] = singletonPointsCalculator.set_point_after_current_index(
            questionIndex,
            point,
        );
        let pointsItr: number = 0;

        while (questionIndex < quiz.questions.length) {
            changeQuestionPoint(questionIndex, points[pointsItr]!);
            questionIndex++;
            pointsItr++;
        }
    }

    function getQuestionPoints(questionIndex: number) {
        return getQuestion(questionIndex)?.basePoints;
    }

    useEffect(() => {
        setBasePoints(currentQ?.basePoints.toString() || '0');
    }, [currentQ?.basePoints]);

    return (
        <div className="text-neutral-900 dark:text-neutral-100 flex flex-col justify-start items-start gap-y-4">
            <div className="w-full flex items-center justify-between border-b border-neutral-300 dark:border-neutral-700 pb-2">
                <div className="text-lg font-medium">Questions</div>
                <RxCross2 onClick={() => setState(DraftRenderer.NONE)} className="cursor-pointer" />
            </div>
            <Options />

            <div className="w-full px-2 mt-6">
                <div className="flex items-center justify-start gap-x-1">
                    <span className="text-sm font-normal text-dark-primary dark:text-light-base">
                        Base Points
                    </span>
                    <ToolTipComponent content="This is the base points for this question">
                        <AiOutlineQuestionCircle size={15} />
                    </ToolTipComponent>
                </div>
                <div className="flex w-full items-center gap-x-2 mt-1 text-xs text-neutral-500 dark:text-neutral-400">
                    between<span>{getQuestionPoints(currentQuestionIndex - 1) || 0}</span>-
                    <span>{getQuestionPoints(currentQuestionIndex + 1) || <IoIosInfinite />}</span>
                </div>
                <Input
                    type={'number'}
                    min={getQuestionPoints(currentQuestionIndex - 1)}
                    max={getQuestionPoints(currentQuestionIndex + 1)}
                    value={basePoints}
                    className={`mt-1 appearance-none [&::-webkit-inner-spin-button]:appearance-none [&::-webkit-outer-spin-button]:appearance-none ${wrongBasePoints ? 'border border-red-600 text-red-600' : ''} `}
                    onChange={handleBasePointsChange}
                />
            </div>
            <UploadQuizImage />
        </div>
    );
}
