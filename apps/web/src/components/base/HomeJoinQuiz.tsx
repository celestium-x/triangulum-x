import HeadAndSubHead from "../content/HeadAndSubHead";
import JoinQuizForm from "../utility/JoinQuizForm";

export default function HomeJoinQuiz() {
    return (
        <div className="flex flex-col items-center justify-center w-full min-h-[70vh] animate-fadeIn">
            <HeadAndSubHead
                heading="Join Quiz"
                subHeading="Paste or enter the quiz code below"
            />

            <JoinQuizForm />
        </div>
    );
}
