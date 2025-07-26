import JoinQuizBar from "../base/JoinQuizBar";
import HeadAndSubHead from "../content/HeadAndSubHead";

export default function HomeDashboard() {
    return (
        <div>
            <div className="p-8">
                <HeadAndSubHead
                    heading="Dashboard"
                    subHeading="Manage your quizzes, analytics, and more"
                />

            </div>
            <JoinQuizBar />
        </div>
    )
}