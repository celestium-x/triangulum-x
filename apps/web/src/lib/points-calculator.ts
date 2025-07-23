export default class PointsCalculator {
    private base_points: number;
    private point_multiplier: number;
    private no_of_question: number;

    constructor(no_of_question: number, base_points: number = 100) {
        this.base_points = base_points;
        this.point_multiplier = 1.2;
        this.no_of_question = no_of_question;
    }

    public calculate_linear_points(new_point_multiplier: number): number[] {
        const points: number[] = [];
        this.point_multiplier = new_point_multiplier;

        const increment = this.base_points * (new_point_multiplier - 1);

        for (let i = 0; i < this.no_of_question; i++) {
            const questionPoints = this.base_points + (increment * i);
            points.push(Math.round(questionPoints));
        }
        return points;
    }

    public calculate_stepped_points(new_point_multiplier: number): number[] {
        const points: number[] = [];
        this.point_multiplier = new_point_multiplier;

        const step_size = Math.round(this.base_points * (new_point_multiplier - 1) / 2);

        for (let i = 0; i < this.no_of_question; i++) {
            if (i === 0) {
                points.push(this.base_points);
            } else if (i <= 3) {
                const prevPoint = points[i - 1];
                if (prevPoint !== undefined) {
                    points.push(prevPoint + step_size);
                }
            } else if (i <= 6) {
                const prevPoint = points[i - 1];
                if (prevPoint !== undefined) {
                    points.push(Math.round(prevPoint + step_size * 1.5));
                }
            } else {
                const prevPoint = points[i - 1];
                if (prevPoint !== undefined) {
                    points.push(prevPoint + step_size * 2);
                }
            }
        }

        const rounded_points = points.map(p => Math.round(p / 5) * 5);
        return rounded_points;
    }

}