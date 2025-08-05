import { Template } from '@/lib/templates';
import { cn } from '@/lib/utils';
import { QuestionType } from '@/types/prisma-types';
import CanvasAccents from '../utility/CanvasAccents';
import { BsThreeDots } from 'react-icons/bs';
import { MouseEvent, useState, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useHandleClickOutside } from '@/hooks/useHandleClickOutside';
import { BiTrash } from 'react-icons/bi';
import { Button } from '../ui/button';

interface MiniCanvasProps {
    template: Template | undefined;
    question: QuestionType;
    currentQuestionIndex: number;
    questionIndex: number;
    setCurrentQuestionIndex: (index: number) => void;
    removeQuestion: (index: number) => void;
    onClick?: () => void;
}

export default function MiniCanvas({
    template,
    question,
    currentQuestionIndex,
    questionIndex,
    setCurrentQuestionIndex,
    removeQuestion,
    onClick,
}: MiniCanvasProps) {
    const [openMiniCanvasOptions, setOpenMiniCanvasOptions] = useState<boolean>(false);
    const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
    const buttonRef = useRef<HTMLDivElement>(null);
    const dropdownRef = useRef<HTMLDivElement>(null);
    const selectedStyles = 'border-2 border-[#5e59b3]';

    function handleRemoveQuestion() {
        removeQuestion(questionIndex);
        setCurrentQuestionIndex(currentQuestionIndex - 1);
        setOpenMiniCanvasOptions(false);
    }

    function stripHtml(html: string): string {
        // Check if we're in the browser environment
        if (typeof window === 'undefined') {
            // Fallback for SSR: simple regex-based HTML stripping
            return html.replace(/<[^>]*>/g, '');
        }

        // Browser environment: use DOM API
        const div = document.createElement('div');
        div.innerHTML = html;
        return div.textContent || div.innerText || '';
    }

    const preview = stripHtml(question.question).slice(0, 10) + '...';

    function openMiniCanvasOptionsHandler(e: MouseEvent<HTMLDivElement>) {
        e.stopPropagation();

        if (buttonRef.current) {
            const rect = buttonRef.current.getBoundingClientRect();
            setDropdownPosition({
                top: rect.top,
                left: rect.right + 8,
            });
        }

        setOpenMiniCanvasOptions((prev) => !prev);
    }

    useHandleClickOutside([buttonRef, dropdownRef], setOpenMiniCanvasOptions);

    return (
        <>
            <div
                onClick={() => {
                    setCurrentQuestionIndex(question.orderIndex);
                    onClick?.();
                }}
                className={cn(
                    'w-full rounded-md h-18 p-0.5 cursor-pointer relative ',
                    currentQuestionIndex === question.orderIndex && selectedStyles,
                )}
                style={{ boxSizing: 'border-box' }}
            >
                <div
                    style={{
                        backgroundColor: template?.background_color,
                        color: template?.text_color,
                    }}
                    className="w-full h-full rounded-sm flex justify-center items-center relative group"
                >
                    <div className="text-[5px] text-center text-light-base bg-dark-base rounded-full absolute top-2 left-2 px-2 py-1 hidden group-hover:block">
                        Question {questionIndex + 1}
                    </div>
                    <div
                        ref={buttonRef}
                        onClick={openMiniCanvasOptionsHandler}
                        className="absolute top-1.5 right-1.5 cursor-pointer"
                    >
                        <BsThreeDots
                            size={18}
                            className="text-neutral-900 dark:text-neutral-100 px-1 py-[1px] rounded-sm dark:bg-dark-base/20 bg-light-base/30"
                        />
                    </div>
                    <CanvasAccents
                        design={template?.accent_type}
                        accentColor={template?.accent_color}
                    />
                    <div className="text-xs">{preview}</div>
                </div>
            </div>

            {openMiniCanvasOptions &&
                createPortal(
                    <div
                        ref={dropdownRef}
                        className={cn(
                            'bg-light-base/90 dark:bg-dark-base/90 border border-gray-200 dark:border-gray-700',
                            'fixed w-[8rem] rounded-md shadow-lg z-[1000]',
                        )}
                        style={{
                            top: dropdownPosition.top,
                            left: dropdownPosition.left,
                        }}
                    >
                        <Button
                            onClick={() => handleRemoveQuestion()}
                            className={cn(
                                'px-3 py-2 text-red-500 w-full bg-transparent hover:bg-transparent cursor-pointer',
                                'flex items-center justify-between',
                            )}
                        >
                            <span className="text-xs">delete</span>
                            <BiTrash size={12} />
                        </Button>
                    </div>,
                    document.body,
                )}
        </>
    );
}
