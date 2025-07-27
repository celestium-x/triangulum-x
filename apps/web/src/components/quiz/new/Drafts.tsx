import { DraftRenderer, useDraftRendererStore } from '@/store/new-quiz/useDraftRendererStore';
import QuestionsDraft from './QuestionsDraft';
import ThemesDraft from './ThemesDraft';
import InteractionsDraft from './InteractionsDraft';
import UtilityCard from '@/components/utility/UtilityCard';
import AdvancedDraft from './AdvancedDraft';
import StakeDraft from './StakeDraft';

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

    return (
        <UtilityCard className="bg-light-base dark:bg-dark-base/30 rounded-sm overflow-hidden py-4 px-6 border-[1px] border-neutral-300 dark:border-neutral-800 w-[326px]">
            {handleDraftRenderer()}
        </UtilityCard>
    );
}
