import PointsCalculator from "@/lib/points-calculator";
let singletonPointsCalculator: PointsCalculator | null = null;

export function getSingletonPointsCalculator(no_of_question: number, base_points: number) {
    if (!singletonPointsCalculator) {
        singletonPointsCalculator = new PointsCalculator(no_of_question, base_points);
    }
    return singletonPointsCalculator;
}