"use client"

import { DraftRenderer, useDraftRendererStore } from '@/store/new-quiz/useDraftRendererStore';
import QuestionsDraft from './QuestionsDraft';
import ThemesDraft from './ThemesDraft';
import InteractionsDraft from './InteractionsDraft';
import UtilityCard from '@/components/utility/UtilityCard';
import AdvancedDraft from './AdvancedDraft';
import StakeDraft from './StakeDraft';
import { JSX, useEffect } from 'react';
import gsap from 'gsap';

export default function Drafts() {
    const { state } = useDraftRendererStore();

    function handleDraftRenderer() {
        switch (state) {
            case DraftRenderer.QUESTION:
                return <QuestionsDraft />;
            case DraftRenderer.THEME:
                return <ThemesDraft />;
            case DraftRenderer.INTERACTION:
                return <InteractionsDraft />;
            case DraftRenderer.ADVANCED || DraftRenderer.AUTO_SAVE:
                return <AdvancedDraft />;
            case DraftRenderer.STAKE:
                return <StakeDraft />;
            case DraftRenderer.NONE:
                return null;
        }
    }

    return <>
        <BigDrafts handleDraftRenderer={handleDraftRenderer} />
        <SmallDrafts handleDraftRenderer={handleDraftRenderer} />
    </>
}

function BigDrafts({ handleDraftRenderer }: { handleDraftRenderer: () => JSX.Element | null | undefined }) {
    return (
        <UtilityCard className="hidden lg:flex flex-col bg-light-base dark:bg-dark-base/30 rounded-sm overflow-hidden py-4 px-6 border-[1px] border-neutral-300 dark:border-neutral-800 w-[326px]">
            {handleDraftRenderer()}
        </UtilityCard>
    );
}


function SmallDrafts({ handleDraftRenderer }: { handleDraftRenderer: () => JSX.Element | null | undefined }) {

    useEffect(() => {
        gsap.from("utility", {
            x: 300,
            duration: 0.2,
            ease: "power2.inOut"
        });
    }, [handleDraftRenderer]);

    return (
        <UtilityCard className="utitlity absolute z-40 lg:hidden bg-light-base dark:bg-dark-base rounded-sm overflow-hidden py-4 px-6 border-[1px] border-neutral-300 dark:border-neutral-800 w-[326px]">
            {handleDraftRenderer()}
        </UtilityCard>
    );
}
